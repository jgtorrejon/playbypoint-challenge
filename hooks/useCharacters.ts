import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useFilters } from '@/context/FilterContext';
import GET_CHARACTERS from '@/api/getCharacters';

export default function useCharacters() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [name, setName] = useState('');

  const { filters } = useFilters();

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      name,
      ...filters
    },
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
        variables: {
          page: nextPage
        },
      });

      setCharacters((prev):[] => [...prev, ...newData.characters.results]);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  const filterByName = async (name : string) => {
    const { data: newData } = await refetch({
      page: 1,
      name,
      ...filters,
    });
    setPage(1);
    setName(name);
    setCharacters([ ...newData.characters.results ] );
  };

  return {
    page,
    loading,
    loadingMore,
    error,
    characters,
    loadMore,
    filterByName,
  };
};
