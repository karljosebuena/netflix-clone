import React, { useState } from 'react'
import { useEffect } from 'react';
import './Banner.css'
import axios from './axios'
import requests from './Request'

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginal);
        setMovie(
          request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
          ]
        )
        return requests;
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  return (
    <header className="banner" style={{
      backgroundSize: 'cover',
      backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
      backgroundPosition: 'top center'
    }}>
      <div className="banner_contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner
