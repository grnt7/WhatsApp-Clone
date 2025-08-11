import {  Text, ImageBackground, StyleSheet, FlatList } from 'react-native'
import Message from '@/src/components/Message';
import bg from "../../assets/assets/images/BG.png";
import messages from "../../assets/assets/data/messages.json"; // Assuming you have a messages data file


const ChatScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.bg}>
     <FlatList
        data={messages} renderItem={({item}) => <Message message={item}/>} 
        style={styles.list}
        inverted // This will make the list scroll to the bottom
        />
    </ImageBackground> 
  )
}

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    
  },
    list: {
        
        padding: 10,
    },
});