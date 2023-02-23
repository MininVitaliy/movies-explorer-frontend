import { useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreBlocks from "../MoreBlocks/MoreBlocks";

function Movies({isSearch,
                  onOpenPopup,
                  getMovies,
                  cards,
                  loading,
                  searchResult,
                  isAdditionalMovies,
                  moreBlockOnClick,
                  location,
                  addNewCardMovies,
                  deleteCardMovies,
                  isMoviesSaveMe }) {

  const [searchMovies, setSearchMovies] = useState(true)

  function handleSubmitMovie (isValid, name, shortFilms) {
    if (isValid === false) {
      onOpenPopup(true, 'Нужно ввести ключевое слово')
    } else {
      getMovies(name, shortFilms)
    }
  }

  return (
    <main className="content">
      <SearchForm
        isSearch={isSearch}
        handleSubmitMovie={handleSubmitMovie}
      />
      <MoviesCardList
        cards={cards}
        loading={loading}
        searchResult={searchResult}
        location={location}
        addNewCardMovies={addNewCardMovies}
        deleteCardMovies={deleteCardMovies}
        searchMovies={searchMovies}
        isMoviesSaveMe={isMoviesSaveMe}
      />
      <MoreBlocks
        moreBlockOnClick={moreBlockOnClick}
        isAdditionalMovies={isAdditionalMovies}
      />
    </main>
  )
}

export default Movies;