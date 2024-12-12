import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from 'expo-router';
import GET_EPISODE_BY_ID from '@/api/getEpisodeById';
import Loader from '@/components/Loader';

export default function EpisodeDetails() {
  const params = useLocalSearchParams();

  const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
    variables: { id: params.id },
  });

  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  const { episode } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.info}>Air Date: {episode.air_date}</Text>
      <Text style={styles.info}>Episode Code: {episode.episode}</Text>

      <Text style={styles.sectionTitle}>Characters in this Episode:</Text>
      <FlatList
        data={episode.characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.characterItem}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  characterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterName: {
    fontSize: 16,
  },
});
