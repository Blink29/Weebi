import "./header.scss";

import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';

const Header = () => {
  return (
    <div className="header">
      <div className="weebi">
        Weebi<span className="dot">.</span>io
      </div>
      <div className="search">
        <input
            placeholder="Search anime..."
            autoFocus
            type="text"
            className="search-bar"
        />
        <img src={SearchIcon} alt="search-icon" className="search-icon"/>
        </div>
      </div>
  );
};

export default Header;
