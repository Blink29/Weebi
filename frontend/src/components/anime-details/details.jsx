import { useEffect, useState } from 'react';
import './details.scss'

import { useNavigate, useParams } from 'react-router-dom'

const AnimeDetails = ({animeList}) => {
  const [currentAnime, setCurrentAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const {animeTitle} = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const get_currentAnime = async () => {
      const response = await animeList.find(anime => anime.title.replace(/-/g, " ") === decodeURIComponent(animeTitle.replace(/-/g, " ")))
      setCurrentAnime(response)
      localStorage.setItem("currentAnime", JSON.stringify(response))
      setIsLoading(false)
    }
    get_currentAnime()

  }, [animeList, animeTitle])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const imgUrl = currentAnime.image
  const img = imgUrl.split("https")

  let anime_image;
  
  if(typeof img[2] === 'undefined') {
    anime_image = `https` + img[1]
  } else {
    anime_image = `https` + img[2]
  }

  // console.log(currentAnime.episode_player_links[currentAnime.episode_player_links.length -1].episode_num)
  const watchAnime = () => {
    const watch_url = currentAnime.episode_player_links[currentAnime.episode_player_links.length -1].episode_num
    const encoded_watch_url = encodeURIComponent(watch_url)
    navigate(`/play/${encoded_watch_url}`);
  };

  return (
    <div className="details">
        <div className="wrapper">
            <img src={anime_image} alt="anime-img" className='img'/>
            <div className="container">
                <button className='watch-btn' onClick={watchAnime}>Watch</button>
                <div className="anime-name">
                    {currentAnime.title}
                </div>
                <div className="genre">Genre: <span className='genre-list'>{currentAnime.genre.join(', ')}</span></div>
                <div className="synopsis">Synopsis: <span className='synopsis-text'>{currentAnime.summary}</span></div>
            </div>  
        </div>
    </div>
  )
}

export default AnimeDetails