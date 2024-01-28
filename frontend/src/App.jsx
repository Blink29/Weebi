import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import axios from 'axios'
import AnimeCard from './components/anime-card/card'
import AnimeDetails from './components/anime-details/details'
import StreamingPage from './components/streaming-page/stream'
import Header from './components/header/header'


function App() {
  const [animeList, setAnimeList] = useState([])

  useEffect(() => {
    const fetchAnimeList = async () => {
      const res = await axios.get('http://localhost:9000/api/anime_list')
      setAnimeList(res.data)
      console.log(res.data)
    }
    fetchAnimeList();
  }, [animeList])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        {/* <Route path="/anime/:animeName" element={<AnimeDetails animeList={animeList}/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
