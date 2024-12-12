import { Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

type Props = {
  id: number,
  episode: string,
  name: string
  air_date: string
}

export default function EpisodeItem({id, episode, name, air_date} : Props) {
  return (
    <Link
      href={{ pathname: "/episodes", params: { id: id } }}
      asChild
    >
      <Pressable style={styles.episodeItem}>
        <Text style={styles.episodeName}>{episode}: {name}</Text>
        <Text style={styles.episodeDate}>{air_date}</Text>
      </Pressable>
    </Link>
  )
};

const styles = StyleSheet.create({
  episodeItem: {
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomColor: '#2A2E45',
    borderBottomWidth: 0.2,
  },
  episodeName: {
    fontSize: 16,
  },
  episodeDate: {
    fontSize: 14,
    color: '#666',
  },
});
