import { Text, FlatList, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import CharacterItem from '@/components/CharacterItem';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import EmptyPage from '@/components/EmptyPage';
import { COLORS } from '@/constants/theme';
import useCharacters from '@/hooks/useCharacters';

export default function HomePage() {
  const {
    page,
    loading,
    loadingMore,
    error,
    characters,
    loadMore,
    filterByName
  } = useCharacters();

  if (loading && page === 1) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <StatusBar/>
      <SearchBar onSearch={filterByName} />

      { loading ? (
        <Loader />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CharacterItem
              id={item.id}
              name={item.name}
              specie={item.species}
              image={item.image}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<EmptyPage />}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : null
          }
        />
      ) }
    </SafeAreaView>
  );
}
