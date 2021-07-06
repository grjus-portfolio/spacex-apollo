import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<ul class="nav justify-content-center">
			<li class="nav-item">
				<Link to="/launches" className="nav-link active">Launches</Link>
			</li>
			<li class="nav-item">
				<Link to="/rockets" className="nav-link active">Rockets</Link>
			</li>

		</ul>
	);
}

export default Navbar;
