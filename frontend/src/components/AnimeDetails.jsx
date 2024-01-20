import React from 'react'
import { useParams } from 'react-router-dom'

const AnimeDetails = ({animeList}) => {
  const {animeName} = useParams();
  const decodedAnimeName = decodeURIComponent(animeName)
  const selectedAnime = animeList.find((anime) => anime.anime_name === decodedAnimeName)

  if(!selectedAnime) return (<div>Not found</div>)

  return (
    <div>
      <div>{selectedAnime.anime_name}</div>
      {selectedAnime.iframe_links.map((link, index) => (
        <div key={index}>
          <iframe src={link} width="640" height="360" allowFullScreen></iframe>
        </div>
      
      ))}
    </div>
  )
}

export default AnimeDetails