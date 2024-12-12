import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="index" options={{
          headerShown: false
        }}/>
        <Stack.Screen name="details" options={{
          headerTitle: 'Details'
        }}/>
        <Stack.Screen name="episodes" options={{
          presentation: 'modal',
        }}/>
      </Stack>
    </ApolloProvider>
  );
}
