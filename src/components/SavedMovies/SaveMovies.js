import React from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SaveMovies({isShortFilms, setIsShortFilms, isSearch}) {
  return (
    <main className="content">
      <SearchForm
        shortFilms={isShortFilms}
        onClick={setIsShortFilms}
        isSearch={isSearch}
      />
      <MoviesCardList />
      <div className='content__empty-block'></div>
    </main>
  )
}

export default SaveMovies;