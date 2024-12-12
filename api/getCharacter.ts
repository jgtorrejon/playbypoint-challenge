import { gql } from '@apollo/client';

const GET_CHARACTER = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      species
      gender
      status
      image
      location {
        name
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export default GET_CHARACTER;
