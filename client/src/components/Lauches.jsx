import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import Sorter from './Sorter';
import { useQuery } from "react-apollo";


const LAUNCHES_QUERY = gql`
query LauchesQuery{
	launches {
		flight_number
		mission_name
		launch_date_local
		launch_success
		details
	}
}
`;


export default function Lunches() {

	const { loading, error, data } = useQuery(LAUNCHES_QUERY);

	if (loading) return <h4>Loading...</h4>;
	if (error) return console.log(error);
	return (
		<>
			<h4 className="display-6 my-3">Launches</h4>
			<Sorter />
			{
				data.launches.map(launch => (
					<LaunchItem key={launch.flight_number} launch={launch} details={launch.details} />
				))
			}
		</>
	);


}


