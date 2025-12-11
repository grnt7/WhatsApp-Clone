import { NavigationProp, useNavigation } from "@react-navigation/native";
import { generateClient } from 'aws-amplify/api'; // Correct import for client
import { getCurrentUser } from 'aws-amplify/auth'; // Correct import for authentication
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GraphQLResult } from '@aws-amplify/api';
import { GraphQLQuery } from "@aws-amplify/api"; // You may need this for type safety
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from '../../types'

dayjs.extend(relativeTime);

// Initialize the client for this component
const client = generateClient();

interface User {
  id: string;
  name: string;
  image: string;
  status: string;
}

interface ContactListItemProps {
  user: User;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ user }) => {
  //const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = async () => {
    console.warn("Pressed")

    try {
      // Create a new chat room using the MODERN client.
     const newChatRoomData = (await client.graphql({
  query: createChatRoom,
  variables: { input: {} }
})) as GraphQLResult<any>;
      
      console.log(newChatRoomData);
      
      if (!newChatRoomData.data?.createChatRoom) {
        console.log("Error creating the chat error")
      }

      const newChatRoom = newChatRoomData.data?.createChatRoom;

      if (!newChatRoom) {
        console.log("Chat room not created, exiting.");
        return;
      }

      // Add the clicked user to the new chat room
      await client.graphql({
        query: createUserChatRoom,
        variables: {
          input: {
            userId: user.id,
            chatRoomId: newChatRoom.id,
          },
        },
      });

      // Add the authenticated user to the new chat room
      const authUser = await getCurrentUser(); // MODERN AUTHENTICATION CALL
      
      await client.graphql({
        query: createUserChatRoom,
        variables: {
          input: {
            userId: authUser.userId,
            chatRoomId: newChatRoom.id,
          },
        }
      });
      
      // Navigate to the newly created chat room
      navigation.navigate('Chat', { id: newChatRoom.id, name: user.name });
      
    } catch (e) {
      console.log('Error creating chat room:', e);
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: user.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
    fontSize: 12,
    width: "100%",
  },
});