import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useLocalSearchParams, Link } from 'expo-router';
import { useQuery } from '@apollo/client';
import GET_CHARACTER from '@/api/getCharacter';

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: params.id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: data.character.image }} />
        <View style={styles.headerText}>
          <Text style={styles.nameText}>{data.character.name}</Text>
          <Text style={styles.infoText}>{data.character.species} - {data.character.gender} - {data.character.status}</Text>
          <Text style={styles.locationText}>Location: {data.character.location.name}</Text>
        </View>
      </View>
      <View style={styles.episodeContainer}>
        <Text style={styles.episodeHeader}>Episodes:</Text>
        <FlatList
          data={data.character.episode}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link style={styles.episodeItem} href={{ pathname: "/episodes", params: { id: item.id } }}>
              <Text style={styles.episodeName}>{item.episode}: {item.name}</Text>
              <Text style={styles.episodeDate}>{item.air_date}</Text>
            </Link>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    marginBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
  episodeContainer: {
    marginTop: 10,
  },
  episodeHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  episodeItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  episodeName: {
    fontSize: 16,
    color: "#333",
  },
  episodeDate: {
    fontSize: 14,
    color: "#666",
  },
});