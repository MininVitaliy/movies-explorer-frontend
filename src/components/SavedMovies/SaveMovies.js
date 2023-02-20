import {useCallback, useState, useEffect} from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import filteringMovies from "../../utils/filteringMovies";

function SaveMovies({isSearch,
                      location,
                      isMoviesSaveMe,
                      loading,
                      searchResult,
                      deleteCardMovies,
                      setSearchResultMeToggle,
                      isMoviesDelete
                    }) {

  const [searchMovies, setSearchMovies] = useState(true);
  const [searchNewMovies, setSearchNewMovies] = useState([]);

  function handleSubmitMovieInternalCheck (isValid, name, shortFilms) {
    if (isValid === false) {
      if (isMoviesSaveMe.length > 0) {
        setSearchMovies(true)
        setSearchResultMeToggle(true)
      } else {
        setSearchResultMeToggle(false)
      }
    } else {
      searchMoviesAuthor(name, shortFilms)
    }
  }

  useEffect(() => {
    setSearchNewMovies(isMoviesSaveMe)
}, [isMoviesSaveMe]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      if (isMoviesSaveMe.length > 0) {
        setSearchResultMeToggle(true)
      } else {
        setSearchResultMeToggle(false)
      }
    }
  }, [location]);

  const searchMoviesAuthor = useCallback((name, shortFilms) => {
    let cardSearch = filteringMovies(isMoviesSaveMe, name, shortFilms)
    setSearchNewMovies(cardSearch)
    setSearchMovies(false)
    if (cardSearch.length === 0) {
      setSearchResultMeToggle(false)
    }
  }, []);

  return (
    <main className="content">
      <SearchForm
        isSearch={isSearch}
        handleSubmitMovieInternalCheck={handleSubmitMovieInternalCheck}

      />
      <MoviesCardList
          location={location}
          loading={loading}
          searchResult={searchResult}
          cards={isMoviesSaveMe}
          isMoviesSaveMe={isMoviesSaveMe}
          deleteCardMovies={deleteCardMovies}
          isMoviesDelete={isMoviesDelete}
          searchMovies={searchMovies}
          searchNewMovies={searchNewMovies}
      />
      <div className='content__empty-block'></div>
    </main>
  )
}

export default SaveMovies;