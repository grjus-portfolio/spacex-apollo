import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem({ launch: { flight_number, mission_name, launch_date_local, launch_success, details } }) {
	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-9">

					<h5>Mission: <span className="text-primary">{mission_name}</span></h5>
					Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>

					<p>Launch:<span className={classNames({
						"text-success": launch_success,
						"text-danger": !launch_success
					})}>{launch_success ? "Sucess" : "Failed"}</span></p>

				</div>

				<div className="col-md-3">
					<Link to={`/launch/${flight_number}`} className="btn btn-secondary">Launch details</Link>
				</div>
				<div className="col-md-9 my-2">
					<span className="text-secondary">{details}</span>
				</div>
			</div>
		</div>
	);
}
