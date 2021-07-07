import React, { useState } from 'react';



function Search({ handleSearch, search }) {



	return (
		<form class="d-flex">
			<input onChange={handleSearch} value={search} class="form-control me-sm-2 my-4" type="text" placeholder="Search mission" />
			{/* <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
		</form>
	);
}

export default Search;
