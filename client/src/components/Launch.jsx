import { gql } from 'apollo-boost';
import Moment from 'react-moment';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import LoadingScreen from './LoadingScreen';

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
      id
      name
      success
      date_local
      details
      links {
        patch {
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
      // eslint-disable-next-line react/destructuring-assignment
      id: props.match.params.id,
    },
  });
  if (loading) return <LoadingScreen />;
  if (error) return console.log(error);
  const {
    // eslint-disable-next-line camelcase
    name, id, date_local: dateLocal, success, links, rocket,
  } = data.launch;
  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">
          Mission:
          {name}
        </span>
      </h1>
      <div className="d-flex justify-content-start">
        <div className="p-2">
          <h4 className="mb-3">Launch details</h4>
        </div>
        <div className="p-2">
          <img
            src={links.patch.small}
            alt="patch mark"
            style={{ width: 40, display: 'block', margin: 'auto' }}
          />
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          Flight number:
          {' '}
          {id}
        </li>
        <li className="list-group-item">
          Launch Sucessfull:
          {' '}
          <span
            className={classNames({
              'text-success': success,
              'text-danger': !success,
            })}
          >
            {success ? 'Yes' : 'No'}
          </span>
        </li>
        <li className="list-group-item">
          Date:
          {' '}
          <Moment format="YYYY-MM-DD">{dateLocal}</Moment>
        </li>
      </ul>
      <h4 className="my-3">Rocket details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Rocket ID:
          {' '}
          {rocket.id}
        </li>
        <li className="list-group-item">
          Rocket Name:
          {' '}
          {rocket.name}
        </li>
        <li className="list-group-item">
          Description:
          {' '}
          {rocket.description}
        </li>
      </ul>
      <div className="container my-4">
        <div className="row">
          {rocket.flickr_images.map((item) => (
            <div key={item} className="col-md my-2">
              <img
                src={item}
                alt="rocket"
                style={{ width: 400, display: 'block', margin: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
      <hr />

      <Link to="/launches" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
}

Launch.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
