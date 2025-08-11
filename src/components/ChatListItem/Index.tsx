import { Text, View, Image, StyleSheet } from "react-native"


const ChatListItem = () => {
    return (
       <View style={styles.container}>
        <Image
        source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg'}} 
        style={styles.image}
         />

        <View style={styles.content}>
            
            <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>Lukas</Text>
             <Text style={styles.subTitle}>8:30</Text>
            </View>
            
            <Text numberOfLines={2} style={styles.subTitle}>Hey, how are you?</Text>
       </View>
       </View>
    )



}
export default ChatListItem;

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
    name: {flex:1,
        fontWeight: "bold",
    },
    subTitle: {
        color: "gray",
        fontSize: 12,
    }
});