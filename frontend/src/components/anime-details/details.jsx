import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { useAnimeContext } from '../../context/animeContext'

import './details.scss'

import axios from '../../api/axios';


const AnimeDetails = () => {
  const [currentAnime, setCurrentAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const {selectedAnimeId} = useAnimeContext()

  // console.log(selectedAnimeId)

  // useEffect(() => {
  //   const get_currentAnime = async () => {
  //     const response = await animeList.find(anime => anime.title === (animeTitle))
  //     setCurrentAnime(response)
  //     localStorage.setItem("currentAnime", JSON.stringify(response))
  //     setIsLoading(false)
  //   }
  //   get_currentAnime()

  // }, [animeList, animeTitle, selectedAnimeId])

  useEffect(() => {
    const get_currentAnime = async () => {
      const response = await axios.get('anime/id', {
        params: {
          _id: selectedAnimeId
        }
      })
      const anime = response.data
      setCurrentAnime(anime);
      localStorage.setItem("currentAnime", JSON.stringify(anime));
      setIsLoading(false);
    }

    get_currentAnime();
  }, [selectedAnimeId])

  useEffect(() => {
    const currentAnime = JSON.parse(localStorage.getItem("currentAnime"))
    setCurrentAnime(currentAnime)
    setIsLoading(false)
  }, [])

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

  const watchAnime = () => {
    if (currentAnime && currentAnime.episode_player_links) {
      const watch_url =
        currentAnime.episode_player_links[
          currentAnime.episode_player_links.length - 1
        ].episode_num;
      const encoded_watch_url = encodeURIComponent(watch_url);
      navigate(`/play/${encoded_watch_url}`);
    } else {
      console.error("Current anime or episode links are undefined.");
    }
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