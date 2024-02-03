import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import axios from "./api/axios";

import AnimeDetails from "./components/anime-details/details";
import StreamingPage from "./components/streaming-page/stream";
import Header from "./components/header/header";
import Home from "./components/home/home";
import { AnimeProvider } from "./context/animeContext";

function App() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const res = await axios.get("anime_list", {
          params: {
            sortBy: "_id",
            sortOrder: "asc",
            limit: 100,
          },
        });
        setAnimeList(res.data);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    if (animeList.length === 0) {
      fetchAnimeList();
    }
  }, [animeList]);

  return (
    <BrowserRouter>
      <AnimeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home animeList={animeList} />} />
          <Route
            path="/:animeTitle"
            element={<AnimeDetails animeList={animeList} />}
          />
          <Route
            path="/play/:animeTitleEp"
            element={<StreamingPage animeList={animeList} />}
          />
        </Routes>
      </AnimeProvider>
    </BrowserRouter>
  );
}

export default App;
