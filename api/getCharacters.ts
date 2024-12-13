import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $name: String, $species: String, $status: String) {
    characters(page: $page, filter: { name: $name, species: $species, status: $status }) {
      info {
        next
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`;

export default GET_CHARACTERS;
