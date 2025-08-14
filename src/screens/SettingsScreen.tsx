import { Button } from 'react-native';
import { signOut } from 'aws-amplify/auth'; // 👈 Correct import for signOut
import React from 'react';
import { View } from 'react-native';

const SettingsScreen = () => {
  const handleSignOut = async () => {
    try {
      await signOut(); // 👈 Call the signOut function directly
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
};

export default SettingsScreen;