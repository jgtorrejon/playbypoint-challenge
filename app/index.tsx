import React, { useState } from 'react';
import { Text, FlatList, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { useQuery } from '@apollo/client';
import GET_CHARACTERS from '@/api/getCharacters';
import CharacterItem from '@/components/CharacterItem';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import { COLORS } from '@/constants/theme';

export default function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
    onCompleted: (data) => {
      setCharacters(data.characters.results);
    },
  });

  const loadMore = async () => {
    if (loadingMore || !data?.characters.info.next) return;
    setLoadingMore(true);

    try {
      const nextPage = page + 1;
      const { data: newData } = await fetchMore({
        variables: { page: nextPage },
      });

      setCharacters((prev):[] => [...prev, ...newData.characters.results]);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading && page === 1) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <StatusBar/>

      <SearchBar onSearch={() => console.log('search')}/>

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
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
