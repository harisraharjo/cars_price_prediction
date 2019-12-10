import React from 'react'

const SearchBar = ({searchValue}) => {
    return (
        <div className="pa2 tc">
            <input 
            type="search" 
            className="pa3 ba b--green bg-lightest-blue"
            placeholder="Search"
            onChange={searchValue}
            />
        </div>
    );
}

export default SearchBar;