import { useState, useEffect } from 'react'

// import AnimeCard from '../anime-card/card'
import AnimeCard from '../animeCard'
import './home.scss'

const Home = ({animeList}) => {

  return (
    <div className="home">
      {animeList.map((anime) => (
        // <AnimeCard key={anime._id} anime={anime} />
        <AnimeCard key={anime._id} anime={anime} />
      ))}
    </div>
  )
}

export default Home