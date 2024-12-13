import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import { useFilters } from '@/context/FilterContext';

const FilterPage = () => {
  const { filters, setFilters } = useFilters();

  const [status, setStatus] = useState(filters.status);
  const [species, setSpecies] = useState(filters.species);

  const handleApplyFilters = () => {
    const newFilters = {
      species: species === "All" ? '' : species,
      status: status === "All" ? '' : status,
    };
    setFilters(newFilters);
    router.navigate('../');
  };

  return (
    <View style={styles.container}>
      {/* Species Filter */}
      <Text style={styles.label}>Filter by Species</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={species}
          onValueChange={(itemValue) => setSpecies(itemValue)}
          itemStyle={styles.pickerItemStyle}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Human" value="Human" />
          <Picker.Item label="Animal" value="Animal" />
          <Picker.Item label="Alien" value="Alien" />
          <Picker.Item label="Humanoid" value="Humanoid" />
          <Picker.Item label="Robot" value="Robot" />
          <Picker.Item label="Mythological Creature" value="Mythological Creature" />
          <Picker.Item label="Disease" value="Disease" />
          <Picker.Item label="Cronenberg" value="Cronenberg" />
        </Picker>
      </View>

      {/* Status Filter */}
      <Text style={styles.label}>Filter by Status</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          itemStyle={styles.pickerItemStyle}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Alive" value="Alive" />
          <Picker.Item label="Dead" value="Dead" />
          <Picker.Item label="Unknown" value="Unknown" />
        </Picker>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleApplyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <Link href='../' asChild>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#778da9",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pickerItemStyle: {
    color: 'grey'
  }
});

export default FilterPage;
