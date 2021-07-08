import { useQuery } from 'react-apollo';
import React from 'react';
import { gql } from 'apollo-boost';
import RocketItem from './RocketItem';
import LoadingScreen from './LoadingScreen';

const ROCKETS_QUERY = gql`
  query RocketsQuery {
    rockets {
      id
      name
      description
      flickr_images
      missions {
          id,
          name
      }
    }
  }
`;

export default function Rockets() {
  const { loading, data, error } = useQuery(ROCKETS_QUERY);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  if (error) return console.log(error);
  return (
    <>
      {data?.rockets.map((rocket) => (
        <RocketItem
          key={rocket.id}
          rocket={rocket}
          missions={rocket.missions}
        />
      ))}
    </>
  );
}
