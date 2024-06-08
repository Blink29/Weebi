import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { Link } from "react-router-dom";
import { useAnimeContext } from "../context/animeContext";

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
    <Link to={`/${anime_url}`} onClick={() => setAnimeId(anime_id)}>
      <Card sx={{ maxWidth: 150 }} className="h-full">
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={anime_image}
            alt={anime.title}
          />
          <CardContent>
            {/* <Typography gutterBottom component="div">
              {anime_title}
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
                {anime_title}
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default AnimeCard;
