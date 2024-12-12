import { View, StyleSheet, Text, Image } from "react-native";
import { Link } from "expo-router";

type Props = {
  id: string;
  name: string;
  specie: string;
  image: string;
};

export default function CharacterItem({ id, name, specie, image }: Props) {
  return (
    <Link 
      style={styles.card}
      href={{
        pathname: '/details',
        params: { id: id, name: name }
      }}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.specieText}>{specie}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  specieText: {
    fontSize: 14,
    color: "#666",
  },
});
