import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RocketItem({
  rocket: {
    id, name, description, flickr_images: images,
  },

}) {
  console.log(images[0]);
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h5>
            Rocket:
            {' '}
            <span className="text-primary">{name}</span>
          </h5>
        </div>
        <div className="div col-md-9">
          <img scr="https://i.imgur.com/DaCfMsj.jpg" alt="rocket" />
        </div>
        <div className="row">
          <Link to={`/launch/${id}`} className="btn btn-secondary">
            Rocket details
          </Link>
        </div>
        <div className="col-md-9 my-2">
          <span className="text-secondary">{description}</span>
        </div>
      </div>
    </div>
  );
}

RocketItem.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    flickr_images: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
