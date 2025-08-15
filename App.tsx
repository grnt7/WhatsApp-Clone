// App.tsx
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import awsconfig from './src/aws-exports';

// 1. Import Auth and API functions from the latest Amplify
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';

// 2. Import your GraphQL queries and mutations
// We now also import the 'updateUser' mutation
import { createUser, updateUser } from './src/graphql/mutations';
import { getUser } from './src/graphql/queries';

// Import your screen components
import { Text, View } from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ChatScreen from './src/screens/ChatScreen';
import ContactScreen from './src/screens/ContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// 3. Configure Amplify and create the client instance once
Amplify.configure({
  ...awsconfig,
  Analytics: { disabled: true }
});
const client = generateClient();

const Stack = createNativeStackNavigator();

function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // We'll use this function to check the current user and sync them with the database
    const syncUser = async () => {
      try {
        const authUser = await getCurrentUser();
        // Now we also fetch the user attributes to get their actual name.
        const attributes = await fetchUserAttributes();
        
        console.log("Authenticated User:", authUser);
        console.log("User Attributes:", attributes);
        
        // If an authenticated user is found, proceed with database sync logic
        if (authUser) {
          try {
            // Check if the user already exists in the database
            const userData = await client.graphql({
              query: getUser,
              variables: { id: authUser.userId }
            });

            // Log the attributes to see what's available
            console.log("Attributes returned by Amplify:", attributes);
            
            // Determine the correct name from the attributes with fallbacks
            const newName = attributes.name || attributes.given_name || authUser.username || 'No Name';
            const defaultStatus = "Hey Iam using Whatsapp!";

            // If the user record is not found, create a new one
            if (!userData.data?.getUser) {
              console.log("User not found in DB, creating a new user record.");
              const newUserInput = {
                id: authUser.userId,
                name: newName,
                status: defaultStatus, // Setting the default status for new users
                // You can add other fields here like image, etc.
              };
              await client.graphql({
                query: createUser,
                variables: { input: newUserInput },
              });
              console.log("New user record created successfully.");
            } else {
              console.log("User already exists in the database.");
              
              // Now, we check if the existing user's name or status needs to be updated.
              const existingUser = userData.data.getUser;
              if (existingUser.name !== newName || existingUser.status === null) {
                console.log("Updating existing user's name or status in the database.");
                const updateUserInput = {
                  id: authUser.userId,
                  name: newName,
                  status: existingUser.status || defaultStatus, // Update status if it's null
                };
                await client.graphql({
                  query: updateUser,
                  variables: { input: updateUserInput },
                });
                console.log("User data updated successfully.");
              }
            }
          } catch (e) {
            console.log("Error during user sync:", e);
          }
        }
      } catch (e) {
        console.log("No authenticated user found:", e);
      } finally {
        // Mark the authentication state as ready, regardless of the outcome
        setIsAuthReady(true);
      }
    };

    syncUser();
  }, []);

  // Display a loading screen until the user sync is complete
  if (!isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
