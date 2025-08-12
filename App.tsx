// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the navigators from your project
import ChatScreen from './src/screens/ChatScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ContactScreen from './src/screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*
          CRITICAL STEP: The MainTabNavigator must be the first screen in your
          top-level stack. This tells the app to start with the tab-based
          navigation.

          The 'options={{ headerShown: false }}' is essential to hide the
          stack header and correctly display the tab bar.
        */}
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        {/*
          Any screens that should not have tabs, like an individual chat screen,
          are defined here. The stack will push this screen on top of the tabs.
        */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
