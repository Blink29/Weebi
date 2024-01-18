import React from "react";
import { Link } from "react-router-dom";

import CardImg from "../assets/images/demonslayerCard.jpeg";

const AnimeCard = ({ animeList }) => {
  return (
    <div>
      {animeList.map((anime) => (
        <div key={anime._id}>
          <Link to={`/anime/${encodeURIComponent(anime.anime_name)}`}>{anime.anime_name}</Link>
          <img src={CardImg} alt="anime_img" width={150} height={150} />
        </div>
      ))}
    </div>
  );
};

export default AnimeCard;
