import React from 'react';
import PropTypes from 'prop-types';

function Search({ handleSearch, search }) {
  return (
    <form className="d-flex">
      <input
        onChange={handleSearch}
        value={search}
        className="form-control me-sm-2 my-4"
        type="text"
        placeholder="Search mission"
      />
    </form>
  );
}

export default Search;

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
