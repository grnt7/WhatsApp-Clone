import { View, Text, StyleSheet } from 'react-native'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Message = ({ message }) => {

const isMyMessage = () => {
    return message.user?.id === "u1"; // Assuming "u1" is the current user's ID
};

  return (
    <View style={[
        styles.container, 
        
        { 
            backgroundColor: isMyMessage() ? '#dcf8c6' : '#ffffff',
            alignSelf: isMyMessage() ? 'flex-end':'flex-start'
        }
        ]}
        >
      <Text>{message.text}</Text>
    <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  )
}

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
   // backgroundColor: '#ffffffff',
    //alignSelf: 'flex-start',
    maxWidth: '80%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  
  },
  text: {
    fontSize: 16,
  },
    time: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
});