import { render, screen, fireEvent } from '@testing-library/react-native';
import HomePage from '@/app/index';
import useCharacters from '@/hooks/useCharacters';

jest.mock("@expo/vector-icons/Ionicons");
jest.mock('@/hooks/useCharacters');

describe('<HomeScreen />', () => {
  test('renders Loader during initial loading', () => {
    useCharacters.mockReturnValue({
      page: 1,
      loading: true,
      loadingMore: false,
      error: null,
      characters: [],
      loadMore: jest.fn(),
      filterByName: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText(/Loading .../i)).toBeTruthy();
  });

  test('renders error message if there is an error', () => {
    useCharacters.mockReturnValue({
      page: 1,
      loading: false,
      loadingMore: false,
      error: { message: 'Something went wrong' },
      characters: [],
      loadMore: jest.fn(),
      filterByName: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText(/Something went wrong/i)).toBeTruthy();
  });

  test('shows EmptyPage when there are no characters', () => {
    useCharacters.mockReturnValue({
      page: 1,
      loading: false,
      loadingMore: false,
      error: null,
      characters: [],
      loadMore: jest.fn(),
      filterByName: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText('No Results')).toBeTruthy();
  });

  test('filters characters when text is entered in the search bar', () => {
    const filterByNameMock = jest.fn();
    useCharacters.mockReturnValue({
      page: 1,
      loading: false,
      loadingMore: false,
      error: null,
      characters: [],
      loadMore: jest.fn(),
      filterByName: filterByNameMock,
    });

    const { getByPlaceholderText } = render(<HomePage />);
    const searchBar = getByPlaceholderText('Search by name ...');
    fireEvent.changeText(searchBar, 'Rick');

    expect(filterByNameMock).toHaveBeenCalledWith('Rick');
  });

  test('calls loadMore when end of list is reached', () => {
    const loadMoreMock = jest.fn();
    useCharacters.mockReturnValue({
      page: 1,
      loading: false,
      loadingMore: false,
      error: null,
      characters: [
        { id: '1', name: 'Rick Sanchez', species: 'Human', image: 'rick.png' },
        { id: '2', name: 'Morty Smith', species: 'Human', image: 'morty.png' },
      ],
      loadMore: loadMoreMock,
      filterByName: jest.fn(),
    });

    const { getByTestId } = render(<HomePage />);

    fireEvent(getByTestId('characters-list'), 'onEndReached');

    expect(loadMoreMock).toHaveBeenCalledTimes(1);
  });
});
