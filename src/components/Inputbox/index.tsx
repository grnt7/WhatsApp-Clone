import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');


    const onSend = () => {
        // Handle sending the message
console.warn("Sending a new message:", newMessage);

        setNewMessage(''); // Clear the input after sending
    };
  return (
    <SafeAreaView edges={'bottom'} style={styles.container}>
       <AntDesign name="plus" size={24} marginBottom={25} color="royalblue" />
       <TextInput 
       value={newMessage} 
       onChangeText={setNewMessage} 
       placeholder="Type a message..." 
       style={styles.input} />
       {/* <MaterialIcons name="keyboard-voice" size={24} color="royalblue" /> */}
      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
              <MaterialIcons name="send" size={24}  marginLeft={2} color="white" />
            </TouchableOpacity>
    </SafeAreaView>
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
    marginBottom: 25,
  },
   sendButton: {
    backgroundColor: '#1bd066ff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});