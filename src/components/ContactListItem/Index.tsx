import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const ContactListItem = ({ user }) => {

  const navigation = useNavigation();
    
    return (
       <Pressable onPress={() => navigation.navigate('Chat', { id: chat.id, name: chat.user.name } )}  style={styles.container}>
        <Image 
        source={{ uri: user.image }}
        style={styles.image}
         />

         <View style={styles.content}> 
            
            {/* <View style={styles.row}> */}
            <Text style={styles.name} numberOfLines={1}>
              {user.name}</Text>
             {/* <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text> */}
            {/* </View> */}
            
            <Text numberOfLines={2} style={styles.subTitle}>
              {user.status}
              
              </Text> 
        </View> 
       </Pressable>
    )



}
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
    //backgroundColor:'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    
  },
    name: {
        fontWeight: "bold",
    },
    subTitle: {
        color: "gray",
        fontSize: 12,
         width: "100%",
    }
});