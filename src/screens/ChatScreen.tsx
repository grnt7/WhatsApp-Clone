import Message from '@/src/components/Message';

import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import messages from "../../assets/assets/data/messages.json"; // Assuming you have a messages data file
import bg from "../../assets/assets/images/BG.png";
import InputBox from '../components/Inputbox';
import { useEffect } from 'react';




const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
  navigation.setOptions({ title: route.params.name })
  }, [route.params.name]);

  //console.log(Route);
  //console.log(route);


  return (
    
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
    style={styles.bg}>
    <ImageBackground source={bg} style={styles.bg}>
     
     <FlatList
        data={messages} renderItem={({item}) => <Message message={item}/>} 
        style={styles.list}
        inverted // This will make the list scroll to the bottom
        />
        <InputBox/>
    </ImageBackground> 
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    
  },
    list: {
        
        padding: 10,
    },
     input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
});