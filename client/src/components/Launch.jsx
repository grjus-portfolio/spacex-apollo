import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import LoadingScreen from "./LoadingScreen";
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
query LaunchQuery($id: String!) {
	launch(id:$id) {
		id
		name
		success
		date_local
		details
		links {
			patch{
				small
			}
		}
		rocket {
			id
			name
			description
			flickr_images
            	description
		}
	}
}
`;


export default function Launch(props) {




	const { data, error, loading } = useQuery(LAUNCH_QUERY, {
		variables: {
			id: props.match.params.id
		}
	});
	if (loading) return <LoadingScreen />;
	if (error) return console.log(error);
	const {
		name,
		id,
		date_local,
		success,
		links,
		rocket
	} = data.launch;
	return (
		<div>
			<h1 className="display-4 my-3"><span className="text-dark">Mission:{name}</span></h1>
			<div className="d-flex justify-content-start">
				<div className="p-2">
					<h4 className="mb-3">Launch details</h4>
				</div>
				<div className="p-2">
					<img src={links.patch.small} alt="picture" style={{ width: 40, display: 'block', margin: 'auto' }} />
				</div>

			</div>
			<ul className="list-group">
				<li className="list-group-item">
					Flight number: {id}
				</li>
				<li className="list-group-item">
					Launch Sucessfull: <span className={classNames({
						'text-success': success,
						'text-danger': !success
					})}>{success ? 'Yes' : 'No'}</span>
				</li>
				<li className="list-group-item">
					Date: <Moment format="YYYY-MM-DD">{date_local}</Moment>
				</li>
			</ul>
			<h4 className="my-3">Rocket details</h4>
			<ul className="list-group">
				<li className="list-group-item">Rocket ID: {rocket.id}</li>
				<li className="list-group-item">Rocket Name: {rocket.name}</li>
				<li className="list-group-item">Description: {rocket.description}</li>

			</ul>
			<div class="container my-4">
				<div class="row">
					{rocket.flickr_images.map(item => {
						return (
							<div key={item} class="col-md my-2">
								<img src={item} alt="image" style={{ width: 400, display: 'block', margin: 'auto' }} />
							</div>

						);
					})}

				</div>
			</div>
			<hr />

			<Link to="/launches" className="btn btn-secondary">Back</Link>
		</div>

	);

}

