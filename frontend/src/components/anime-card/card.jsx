import './card.scss'

import Img from '../../assets/images/demonslayerCard.jpeg'

const AnimeCard = () => {
  return (
    <div className="card">
        <img src={Img} alt="anime-img" className='img'/>
        <div className="anime-name">Demon Slayer</div>
        <div className="ep-count">EP 1/12</div>
    </div>
  )
}

export default AnimeCard