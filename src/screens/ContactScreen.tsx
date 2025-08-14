import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native'
import ContactListItem from '../components/ContactListItem/Index';
import { generateClient } from 'aws-amplify/api';
import { listUsers } from '../graphql/queries';

// 1. Create the GraphQL client once, outside of the component
const client = generateClient();

const ContactScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Define an async function to fetch data
        const fetchUsers = async () => {
            try {
                // Use the modern client.graphql() method
                const result = await client.graphql({
                    query: listUsers
                });
                
                // 2. Safely extract and set the users data
                setUsers(result.data?.listUsers?.items);
            } catch (error) {
                // 3. Add error handling to see if the call failed
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // 4. Check if users are loaded to prevent an empty list from rendering
    if (!users) {
        return <Text>Loading...</Text>
    }

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => <ContactListItem user={item} />}
            // 5. Add a keyExtractor to prevent warnings and ensure efficient rendering
            keyExtractor={(item) => item.id}
        />
    );
};

export default ContactScreen;