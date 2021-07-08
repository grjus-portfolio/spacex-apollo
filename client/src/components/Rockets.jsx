import { useLazyQuery } from 'react-apollo';
import React, { useState, useLayoutEffect } from 'react';
import { gql } from 'apollo-boost';
import RocketItem from './RocketItem';
import Search from './Search';
import LoadingScreen from './LoadingScreen';

const ROCKETS_QUERY = gql`
  query RocketsQuery($name: String!) {
    rockets(name: $name) {
      id
      name
      description
      flickr_images
    }
  }
`;

export default function Rockets() {
  const [search, setSearch] = useState('');
  const [fetchData, { loading, data, error }] = useLazyQuery(ROCKETS_QUERY);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      fetchData({
        variables: {
          name: search,
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <>
        <LoadingScreen />
        <Search handleSearch={handleSearch} search={search} />
      </>
    );
  }
  if (error) return console.log(error);
  return (
    <>
      <Search handleSearch={handleSearch} search={search} />
      {data?.rockets.map((rocket) => (
        <RocketItem
          key={rocket.id}
          rocket={rocket}
        />
      ))}
    </>
  );
}
