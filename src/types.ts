import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Chat: { id: string; name: string };
  // Add other screens and their params here
};

export type ChatRoomParamsList = NavigatorScreenParams<RootStackParamList>;