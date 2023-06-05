import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState()

  const getMovie = async () => 
  {

    try {
      
      const response = await axios.get("http://localhost:8080/api/v1/movies")
  
      setMovies(response.data)

    } catch (error) {
      console.log(error);
    }
  }

  const getMovieData = async (movieId) => {

    try {

      if (movieId !== undefined) 
      {


        const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`)
      
        console.log(response);
        
        const singleMovie = response.data
  
        setMovie(singleMovie)
  
        setReviews(singleMovie.reviews)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovie()
  }, [])


  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element = {<Layout/>}>
            <Route path='/' element={<Home movies={movies}/>}></Route>
            <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
            <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} reviews={reviews} setReviews={setReviews} movie={movie}/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
