import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from "./components/AnimeCard/AnimeCard";

interface Anime {
  anime_name: string;
  iframe_links: string[];
}

function App() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/anime_list")
      .then((response) => setAnimeList(response.data.anime_list))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <h1>Anime List</h1>

      {animeList.map((anime) => (
        <div key={anime.anime_name}>
          <div>{anime.anime_name}</div>

          {anime.iframe_links.map((iframe, index) => (
            <div key={index}>
              <iframe
                title={`Episode ${index + 1}`}
                src={iframe}
                width="300"
                height="200"
              ></iframe>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
