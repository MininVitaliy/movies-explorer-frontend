import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import magnifier from '../../images/iconsearch.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({ isSearch,
                      handleSubmitMovie,
                      handleSubmitMovieInternalCheck,
                    }) {

  const [isValid, setIsValid] = useState(false);
  const [isMinLength, setIsMinLength] = useState('');
  const [name, setName] =useState('');
  const [isShortFilmsMovies, setIsShortFilmsMovies] = useState(false);
  const [isEditingCards, setIsEditingCards] =useState(true);
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      if (isValid === false) {
        handleSubmitMovieInternalCheck(isValid, name, isShortFilmsMovies);
      }
    }
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem('last request') !== null) {
      setIsMinLength(2)
      let info = JSON.parse(localStorage.getItem('last request'))
      setName(info.name);
      setIsShortFilmsMovies(info.shortFilms)
      if (info.name.length === 0) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else if (location.pathname === "/saved-movies") {
      setIsMinLength(0)
    }
  }, [location]);


  useEffect(() => {
    if (location.pathname === "/movies" ) {
      setIsEditingCards(true)
    } else if (location.pathname === "/saved-movies") {
      setIsEditingCards(false);
    }
  }, [location]);

  function switchingShortFilms() {
    setIsShortFilmsMovies(!isShortFilmsMovies);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (isEditingCards === true) {
      handleSubmitMovie(isValid, name, isShortFilmsMovies)
    } else {
      handleSubmitMovieInternalCheck(isValid, name, isShortFilmsMovies)
    }
  }

  function handleChangeName(e) {
    setIsValid(e.target.closest('form').checkValidity());
    setName(e.target.value)
  }

  return (
      <section className="search">
        <form className="form" name="form_search" noValidate onSubmit={handleSubmit}>
          {isSearch ?
            <>
              <img src={magnifier} className="form__logo" alt="Поиск"/>
              <input type="text" placeholder="Фильм" name="form-search" className="form__input"
                     required minLength={isMinLength} maxLength="200" onChange={handleChangeName} value={name || ''}/>
              <button type="submit" aria-label="Отправить запрос" className="form__submit"></button>
              <FilterCheckbox
                  shortFilms={isShortFilmsMovies}
                  switchingShortFilms={switchingShortFilms}
              />
            </>
            :
            <>
              <div className="form__mobile">
                <input type="text" placeholder="Фильм" name="form-search" className="form__input"
                  required minLength="2" maxLength="200" onChange={handleChangeName} value={name  || ''} />
                <button type="submit" aria-label="Отправить запрос" className="form__submit"></button>
              </div>
              <FilterCheckbox
                  shortFilms={isShortFilmsMovies}
                  switchingShortFilms={switchingShortFilms}
              />
            </>
          }
        </form>
        <div className="search__border"></div>
      </section>
  )
}

export default SearchForm;