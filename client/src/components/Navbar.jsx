import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link to="/launches" className="nav-link active">
          Launches
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/rockets" className="nav-link active">
          Rockets
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
