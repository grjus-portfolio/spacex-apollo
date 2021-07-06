import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number: Int!) {
	launch(flight_number:$flight_number) {
		flight_number
		mission_name
		launch_year
		launch_success
		launch_date_local
		details
		links {
			mission_patch
		}
		rocket {
			rocket_id
			rocket_name
			rocket_type
            description
		}
	}
}
`;


export class Launch extends Component {
	render() {
		let { flight_number } = this.props.match.params;
		flight_number = parseInt(flight_number);
		return (
			<>
				<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
					{
						({ loading, error, data }) => {
							if (loading) return <div className="spinner-border" status="role" style={{ margin: "auto" }} />;
							if (error) return console.log(error);
							const
								{ mission_name,
									flight_number,
									launch_year,
									launch_success,
									links: { mission_patch },
									rocket: { rocket_id, rocket_name, rocket_type, description }
								} = data.launch;

							return <div>
								<h1 className="display-4 my-3"><span className="text-dark">Mission:{mission_name}</span></h1>
								<div className="d-flex justify-content-start">
									<div className="p-2">
										<h4 className="mb-3">Launch details</h4>
									</div>
									<div className="p-2">
										<img src={mission_patch} alt="picture" style={{ width: 40, display: 'block', margin: 'auto' }} />
									</div>

								</div>
								<ul className="list-group">
									<li className="list-group-item">
										Flight number: {flight_number}
									</li>
									<li className="list-group-item">
										Launch year: {launch_year}
									</li>
									<li className="list-group-item">
										Launch Sucessfull: <span className={classNames({
											'text-success': launch_success,
											'text-danger': !launch_success
										})}>{launch_success ? 'Yes' : 'No'}</span>
									</li>
								</ul>
								<h4 className="my-3">Rocket details</h4>
								<ul className="list-group">
									<li className="list-group-item">Rocket ID: {rocket_id}</li>
									<li className="list-group-item">Rocket Name: {rocket_name}</li>
									<li className="list-group-item">Rocket Type: {rocket_type}</li>
									<li className="list-group-item">Description: {description}</li>
                                    
								</ul>
								<hr />

								<Link to="/launches" className="btn btn-secondary">Back</Link>
							</div>;

						}
					}

				</Query>
			</>
		);
	}
}

export default Launch;
