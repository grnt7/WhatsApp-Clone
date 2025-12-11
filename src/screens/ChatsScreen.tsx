import { FlatList } from "react-native"
import chats from "../../assets/assets/data/chats.json"; // Assuming you have a chats data file
import ChatListItem from "@/src/components/ChatListItem/Index";
import { API, graphqlOperation, Auth } from "aws-amplify";
//import { listChatRooms } from "../graphql/queries";
import { listChatRooms } from "./ChatsScreen/queries";
import { useEffect, useState } from "react";




const ChatsScreen = () => {

    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms =async () => {
        const user = await Auth.currentAuthenticatedUser();
const response = await API.graphql(graphqlOperation(listChatRooms, {id: authUser.attributes.sub})

);
setChatRooms(response.data.listChatRooms.items);
//console.log(response);
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