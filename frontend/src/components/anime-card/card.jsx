import { Link } from 'react-router-dom'
import './card.scss'

const AnimeCard = ({anime}) => {
  const imgUrl = anime.image
  const img = imgUrl.split("https")

  let anime_image;
  
  if(typeof img[2] === 'undefined') {
    anime_image = `https` + img[1]
  } else {
    anime_image = `https` + img[2]
  }

  let anime_title;
  const title = anime.title
  if(title.length > 25) {
    anime_title = title.substring(0, 25) + `...`
  }else {
    anime_title = title
  }

  const anime_url = encodeURIComponent(anime.title.replace(/\s/g, "-"))

  return (
    <div className="card">
        <Link to={`/${anime_url}`} >
          <img src={anime_image} alt="anime-img" className='img'/>
        </Link>
        <div className="anime-name">{anime_title}</div>
        <div className="ep-count">EP 1/12</div>
    </div>
  )
}

export default AnimeCard