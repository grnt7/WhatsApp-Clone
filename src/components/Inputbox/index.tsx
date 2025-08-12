import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');


    const onSend = () => {
        // Handle sending the message
console.warn("Sending a new message:", newMessage);

        setNewMessage(''); // Clear the input after sending
    };
  return (
    <View style={styles.container}>
       <AntDesign name="plus" size={24} color="royalblue" />
       <TextInput 
       value={newMessage} 
       onChangeText={setNewMessage} 
       placeholder="Type a message..." 
       style={styles.input} />
       {/* <MaterialIcons name="keyboard-voice" size={24} color="royalblue" /> */}
        <MaterialIcons onPress={onSend} style={styles.send} name="send" size={24} color="wl" />
 
    </View>
  ) 
}

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'lightgray',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
});