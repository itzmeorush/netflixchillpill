import React, { useEffect, useState } from "react";
import "./Style/Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from './Loader'

const apiKey = "3c6eccf387d428cff79a3a4397484f1d";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img src={img} alt="logo" className="card" />;

// row

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card img={`${imgUrl}/${item.poster_path}`} key={index} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcomingData = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=1`);
      // console.log(data);
      setUpcomingMovies(results);
    };

    fetchUpcomingData();
  }, []);

  useEffect(() => {
    const fetchPopularData = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      // console.log(data);
      setPopularMovies(results);
    };

    fetchPopularData();
  }, []);

  useEffect(() => {
    const fetchTopRatedData = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      // console.log(data);
      setTopRatedMovies(results);
    };

    fetchTopRatedData();
  }, []);

  useEffect(() => {

    const fetchGenreData = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      // console.log(data);
      setGenre(genres);
    };

    fetchGenreData();
  }, []);

  useEffect(() => {
   
    const fetchNowPlayingData = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      // console.log(data);
      setNowPlayingMovies(results);
    };

    fetchNowPlayingData();
  }, []);

  // const [loading, setLoading] = useState(false);


  return (
    <div className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[1]
            ? `url(${`${imgUrl}/${popularMovies[3].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[3] && <h1>{popularMovies[3].original_title}</h1>}
        {popularMovies[3] && <p>{popularMovies[3].overview}</p>}
        <div>
          <button>
            Play <BsFillPlayFill/>
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>


      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top-Rated Movies"} arr={topRatedMovies} />

      <div className="box">
        {genre.map((item) => (
          <Link to={`/genre/${item.id}`} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
