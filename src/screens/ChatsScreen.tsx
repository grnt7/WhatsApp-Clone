import { FlatList } from "react-native"
import chats from "../../assets/assets/data/chats.json"; // Assuming you have a chats data file
import ChatListItem from "@/src/components/ChatListItem/Index";




const ChatsScreen = () => {
    return (
        <FlatList
            data={chats}
    
            renderItem={({ item }) => <ChatListItem chat={item} /> }
           
           //keyExtractor={(item) => item.id}
        />
    );
    
};
    export default ChatsScreen;