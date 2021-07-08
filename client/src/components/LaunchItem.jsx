import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LaunchItem({
  launch: {
    id, name, date_local: dateLocal, success, details,
  },
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h5>
            Mission:
            {' '}
            <span className="text-primary">{name}</span>
          </h5>
          Date:
          {' '}
          <Moment format="YYYY-MM-DD HH:mm">{dateLocal}</Moment>
          <p>
            Launch:
            <span
              className={classNames({
                'text-success': success,
                'text-danger': !success,
              })}
            >
              {success ? 'Sucess' : 'Failed'}
            </span>
          </p>
        </div>

        <div className="col-md-3">
          <Link to={`/launch/${id}`} className="btn btn-secondary">
            Launch details
          </Link>
        </div>
        <div className="col-md-9 my-2">
          <span className="text-secondary">{details}</span>
        </div>
      </div>
    </div>
  );
}

LaunchItem.propTypes = {
  launch: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date_local: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};
