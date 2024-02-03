import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.scss";
import SearchIcon from '../../assets/icons/material-symbols-light_search.svg';
import axios from "../../api/axios";

const Header = () => {
  const [searchAnime, setSearchAnime] = useState("");
  const naviagate = useNavigate();

  const redirectToHome = () => {
    naviagate('/')
  }

  const handleSearchAnime = async (event) => {
    event.preventDefault();
    // const res = await axios('searched_anime', {
    //   params: {
    //     anime_name: searchAnime
    //   }
    // })
    // console.log(res.data);
    naviagate(`search?q=${encodeURIComponent(searchAnime)}`);
    setSearchAnime(" ");
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
            onKeyDown={(e) => e.key === "Enter" && handleSearchAnime(e)}
        />
        <img src={SearchIcon} alt="search-icon" className="search-icon"/>
        </div>
      </div>
  );
};

export default Header;
