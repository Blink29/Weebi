import "./header.scss";

import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const naviagate = useNavigate();

  const redirectToHome = () => {
    naviagate('/')
  }

  return (
    <div className="header">
      <div className="weebi" onClick={redirectToHome}>
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
