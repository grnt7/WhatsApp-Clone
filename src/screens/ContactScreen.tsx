import { View, Text, FlatList } from 'react-native'
import chats from '../../assets/assets/data/chats.json'; // Assuming you have a chats data file
import ContactListItem from '../components/ContactListItem/Index';

const ContactScreen = () => {
  return (
            <FlatList
            data={chats}
            renderItem={({ item }) => <ContactListItem user={item.user} /> }
           
           // keyExtractor={(item) => item.id}
        />
    );
    
};

export default ContactScreen