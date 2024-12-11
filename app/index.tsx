import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data.characters.results.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}