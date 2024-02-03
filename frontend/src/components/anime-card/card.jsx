import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnimeContext } from "../../context/animeContext";
import "./card.scss";

const AnimeCard = ({ anime }) => {
  const { setAnimeId } = useAnimeContext();
  const anime_id = anime._id;

  const imgUrl = anime.image;
  const img = imgUrl.split("https");

  let anime_image;

  if (typeof img[2] === "undefined") {
    anime_image = `https` + img[1];
  } else {
    anime_image = `https` + img[2];
  }

  let anime_title;
  const title = anime.title;
  if (title.length > 25) {
    anime_title = title.substring(0, 25) + `...`;
  } else {
    anime_title = title;
  }

  const anime_url = encodeURIComponent(anime.title);

  return (
    <div className="card">
      <Link to={`/${anime_url}`} onClick={() => setAnimeId(anime_id)}>
        <img src={anime_image} alt="anime-img" className="img" />
      </Link>
      <div className="anime-name">{anime_title}</div>
      <div className="ep-count">EP 1/12</div>
    </div>
  );
};

export default AnimeCard;
