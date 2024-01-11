import React from 'react'
import './AnimeCard.scss'

import CardImage from '../../assets/images/Demon-Slayer.jpeg'

type Props = {}

const AnimeCard = (props: Props) => {
  return (
    <div className="anime-card">
        <img src={CardImage} alt="" />
        <div className="anime-title">DemonSlayer</div>
        <div className="ep-no">Episode 1</div>
    </div>
  )
}

export default AnimeCard