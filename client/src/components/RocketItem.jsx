import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RocketItem({
  rocket: {
    // id,
    name,
    description,
    flickr_images: images,
  },
  missions,

}) {
  const accordion = useRef(null);

  const handleAccordion = () => {
    accordion.current.classList.toggle('show');
  };
  // test comment
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-lg-8">
          <h4>
            <span className="text-primary">{name}</span>
          </h4>
          <p className="text-secondary">{description}</p>
          <p className="text-primary">
            Number of missions:
            {' '}
            <span className="text-secondary">{missions.length}</span>
          </p>
        </div>
        <div className="col-lg-4">
          <img src={images[0]} alt={`rocket-${name}`} style={{ width: '80%' }} />
        </div>
        <hr />
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" onClick={handleAccordion} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Missions
              </button>
            </h2>
            <div aria-hidden="true" ref={accordion} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {missions.map((mission) => <div><Link to={`/launch/${mission.id}`} key={mission.id} className="link-primary">{mission.name}</Link></div>)}

              </div>
            </div>
          </div>
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
  missions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
