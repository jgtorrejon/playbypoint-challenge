import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import GET_CHARACTER from '@/api/getCharacter';
import Loader from '@/components/Loader';
import EpisodeItem from '@/components/EpisodeItem';

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: params.id },
  });

  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: data.character.image }} />
          <View style={styles.headerText}>
            <Text style={styles.nameText}>{data.character.name}</Text>
            <Text style={styles.infoText}>
              {data.character.species} - {data.character.gender} - {data.character.status}
            </Text>
            <Text style={styles.locationText}>Location: {data.character.location.name}</Text>
          </View>
        </View>
        <View style={styles.episodeContainer}>
          <Text style={styles.episodeHeader}>Episodes:</Text>
          {data.character.episode.map((item) => (
            <EpisodeItem
              key={item.id}
              id={item.id}
              name={item.name}
              episode={item.episode}
              air_date={item.air_date}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  episodeContainer: {
    marginTop: 16,
  },
  episodeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});
