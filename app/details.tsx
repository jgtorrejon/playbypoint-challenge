import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@apollo/client';
import GET_CHARACTER from '@/api/getCharacter';

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: params.id },
  });

  console.log(typeof(params.id));
  console.log(error);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.name,
          headerTitleStyle: {
            fontWeight: "bold",
          }
        }}
      />
      <Text>{params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
