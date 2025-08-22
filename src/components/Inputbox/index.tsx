import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import the correct API and Auth functions for Amplify v6
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
// Import the createMessage mutation from your graphql folder
import { createMessage } from "../../graphql/mutations";

const client = generateClient();

const InputBox = ( {chatroomID} ) => {
  // State to hold the new message text
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending the message
  const onSend = async () => {
    // Check for null or undefined chatroomID before proceeding.
    if (!chatroomID) {
      console.error("Error: chatroomID is null or undefined. Cannot send message.");
      return;
    }

    // Check for empty message before proceeding
    if (!newMessage.trim()) {
      console.warn("Message is empty, cannot send.");
      return;
    }

    try {
      // Use the new v6 modular function to get the current user
      const authUser = await getCurrentUser();

      // Create the message object to be sent to Amplify.
      // This is what the GraphQL mutation expects.
      const messageData = {
        chatroomID: chatroomID, 
        text: newMessage.trim(),
        userID: authUser.userId,
      };

      // Use the new v6 client to call the GraphQL mutation
      await client.graphql({
        query: createMessage,
        variables: { input: messageData },
      });
      
      // Clear the input field after sending
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <AntDesign name="plus" size={24} marginBottom={25} color="royalblue" />
      <TextInput 
        value={newMessage} 
        onChangeText={setNewMessage} 
        placeholder="Type a message..." 
        style={styles.input} />
      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
        <MaterialIcons name="send" size={24}  marginLeft={2} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    backgroundColor: '#25d366',//whatsapp green
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});
