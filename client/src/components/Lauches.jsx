import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';


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


export default class Lauches extends Component {
	render() {
		return (
			<>
				<h1 className="display-4 my-3">Launches</h1>
				<MissionKey />
				<Query query={LAUNCHES_QUERY}>
					{
						({ loading, error, data, details }) => {
							if (loading) return <h4>Loading...</h4>;
							if (error) return console.log(error);
							return (
								<>
									{
										data.launches.map(launch => (
											<LaunchItem key={launch.flight_number} launch={launch} details={details} />
										))
									}
								</>
							);
						}
					}
				</Query>
			</>
		);
	}
}

