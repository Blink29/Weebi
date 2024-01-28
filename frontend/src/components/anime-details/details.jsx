import './details.scss'

import Img from '../../assets/images/demonslayerCard.jpeg'


const AnimeDetails = () => {
  return (
    <div className="details">
        <div className="wrapper">
            <img src={Img} alt="anime-img" className='img'/>
            <div className="container">
                <button className='watch-btn'>Watch</button>
                <div className="anime-name">
                    Demon Slayer
                </div>
                <div className="genre">Genre: <span className='genre-list'>Action</span></div>
                <div className="synopsis">Synopsis: <span className='synopsis-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quos quasi quo consequuntur pariatur, iusto veritatis incidunt commodi dicta minima eos ex porro eligendi. Placeat odit reiciendis commodi alias doloribus?</span></div>
            </div>
        </div>
    </div>
  )
}

export default AnimeDetails