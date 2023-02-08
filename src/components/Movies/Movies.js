import { useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreBlocks from "../MoreBlocks/MoreBlocks";
import Preloader from "../Preloader/Preloader";

function Movies({isShortFilms, setIsShortFilms, isSearch}) {
  const [isAdditionalMovies, setIsAdditionalMovies] =useState(true)
  function moreBlockOnClick() {
    setIsAdditionalMovies(!isAdditionalMovies);
    setTimeout(() => {
        setIsAdditionalMovies(true);
    }, 1500)
  }
  return (
    <>
      <SearchForm
        shortFilms={isShortFilms}
        onClick={setIsShortFilms}
        isSearch={isSearch}/>
      <MoviesCardList />
      {isAdditionalMovies ?
        <MoreBlocks moreBlockOnClick={moreBlockOnClick}/>
        :
        <Preloader />
      }
    </>
  )
}

export default Movies;