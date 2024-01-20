import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import axios from 'axios'

import AnimeCard from './components/AnimeCard'
import AnimeDetails from './components/AnimeDetails'

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
        <Route path="/" element={<AnimeCard animeList={animeList} />} />
        <Route path="/anime/:animeName" element={<AnimeDetails animeList={animeList}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
