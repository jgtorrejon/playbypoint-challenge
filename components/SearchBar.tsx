import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  onSearch: (text: string) => void
}

const SearchBar = ({ onSearch } : Props) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text : string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name ..."
        value={searchText}
        onChangeText={handleSearchChange}
        clearButtonMode="while-editing"
      />
      <Link href="/filters" asChild>
        <Pressable style={styles.filterIconContainer}>
          <Ionicons name="filter" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'grey'
  },
  filterIconContainer: {
    borderRadius: 50,
    backgroundColor: '#1F509A',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  }
});

export default SearchBar;
