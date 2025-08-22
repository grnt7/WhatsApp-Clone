import { useNavigation } from "@react-navigation/native";
import { generateClient } from 'aws-amplify/api';
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
dayjs.extend(relativeTime);

// Initialize the client for this component
const client = generateClient();

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      // Create a new chat room using the modern client
      const newChatRoomData = await client.graphql({
        query: createChatRoom,
        variables: { input: {} }
      });

      const newChatRoom = newChatRoomData.data.createChatRoom;

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
