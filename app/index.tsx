import { StyleSheet, Text, View } from "react-native";
import ChatListItem from "@/src/components/ChatListItem/Index";

export default function Index() {
  return (
    <View
      style={styles.container}>

     <ChatListItem />
     
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