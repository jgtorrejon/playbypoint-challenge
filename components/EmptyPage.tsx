import { View, Text, StyleSheet } from 'react-native';

export default function EmptyPage() {
  return(
    <View style={styles.container}>
      <Text>No Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
