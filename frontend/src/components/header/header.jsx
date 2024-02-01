import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.scss";
import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';

const Header = () => {
  const [searchAnime, setSearchAnime] = useState("");
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
            value={searchAnime}
            onChange={(e) => setSearchAnime(e.target.value)}
        />
        <img src={SearchIcon} alt="search-icon" className="search-icon"/>
        </div>
      </div>
  );
};

export default Header;
