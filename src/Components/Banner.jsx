import React from "react";
import "./Banner.css";
import axios from "../axios";
import requests from "../requests";

const baseUrlForImages = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      console.log(requests);
      //   Getting random category from requests
      const res = await axios.get(requests.fetchNetflixOriginals);
      //Getting random movie from resulted category
      const randomNumberForMovie = Math.floor(
        Math.random() * res.data.results.length - 1
      );
      setMovie(res.data.results[randomNumberForMovie]);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  console.log(movie);
  console.log(movie?.backdrop_path);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        background: `url(${baseUrlForImages}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {/*Background Image*/}
      <div className="banner__contents">
        {/* Title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div ==> 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
