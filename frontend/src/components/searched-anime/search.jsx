import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './search.scss';
import AnimeCard from '../anime-card/card';
import axios from '../../api/axios';

const Search = () => {
    const [searchedAnime, setSearchedAnime] = useState([]);
    const location = useLocation();
    const seachedAnimeTitle = decodeURIComponent(new URLSearchParams(location.search).get('q'));
    console.log(seachedAnimeTitle)

    useEffect(() => {
        const fetchSearchedAnime = async () => {
            try {
                const res = await axios.get('searched_anime', {
                    params: {
                        anime_name: seachedAnimeTitle
                    }
                })
                setSearchedAnime(res.data);
            } catch (error) {
                console.error('Error fetching searched anime:', error);
            }
        }
        fetchSearchedAnime();
    }, [seachedAnimeTitle])

  return (
    <div className='search'>
        {searchedAnime.map((anime) => (
            <AnimeCard key={anime._id} anime={anime} />
        ))}
    </div>
  )
}

export default Search