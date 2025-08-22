import { FlatList } from "react-native"
import chats from "../../assets/assets/data/chats.json"; // Assuming you have a chats data file
import ChatListItem from "@/src/components/ChatListItem/Index";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "../graphql/queries";
import { useEffect } from "react";




const ChatsScreen = () => {

    useEffect(() => {
        const fetchChatRooms =async () => {
        const user = await Auth.currentAuthenticatedUser();
const response = await API.graphql(graphqlOperation(listChatRooms, {id: authUser.attributes.sub})

);
console.log(response);
    }
fetchChatRooms();
 } , []);


    return (
        <FlatList
            data={chats}
    
            renderItem={({ item }) => <ChatListItem chat={item} /> }
           
           //keyExtractor={(item) => item.id}
        />
    );
    
};
    export default ChatsScreen;