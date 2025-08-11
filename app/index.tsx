import { StyleSheet, Text, View } from "react-native";
import ChatListItem from "@/src/components/ChatListItem/Index";

const chat = {

  id: "1",
  user: {
  image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
  name: "Lukas",
  },
  lastMessage: {
  
    text: "Hey, how are you?",
    createdAt: "07:30",
  },
};

export default function Index() {
  return (
    <View
      style={styles.container}>
        
     <ChatListItem chat={chat} />
     
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});