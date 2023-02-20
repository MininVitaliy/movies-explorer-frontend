import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({nameMovie,
                      duration,
                      imgMovie,
                      trailerLink,
                      isEditingCards,
                      deleteCardMovies,
                      id,
                      addNewCardMovies,
                      isMoviesSaveMe,
                    }) {

  const [isLiked, setIsLiked] = useState(false);
  const [durationTime, setDurationTime] =useState('');
  const [durationTimeCar, setDurationTimeCar] =useState('');
  const [isImgMovie, setIsImgMovie] = useState('')
  const location = useLocation();

  useEffect(() => {
    if (isEditingCards === true ) {
      let savedFilm = isMoviesSaveMe.filter((obj) => {
        return obj.movieId == id.id;
      });
      if (savedFilm.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [isMoviesSaveMe]);

  function onCardLike () {
    if (isEditingCards === true) {
      let savedFilm = isMoviesSaveMe.filter((obj) => {
        return obj.movieId == id.id;
      });
      if (isLiked === false) {
        addNewCardMovies(id,
            `https://api.nomoreparties.co${imgMovie}`,
            `https://api.nomoreparties.co${id.image.formats.thumbnail.url}`
        )
      } else {
        deleteCardMovies(savedFilm[0]._id)
      }
    } else {
      deleteCardMovies(id._id)
    }
  }

  useEffect(() => {
    if (duration >= 60) {
      let hour = Math.floor(duration/60);
      setDurationTime(`${hour}ч ${duration - hour*60}м`)
      setDurationTimeCar(`${hour}h ${duration - hour*60}m`)
    } else if (duration < 60) {
      setDurationTime(`${duration}м`)
      setDurationTimeCar(`${duration}m`)
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/saved-movies" ) {
      if (imgMovie.includes('https://api.nomoreparties.co')) {
        setIsImgMovie(imgMovie)
      } else {
        setIsImgMovie(`https://api.nomoreparties.co${imgMovie}`)
      }
    } else if (location.pathname === "/movies") {
      if (imgMovie.includes('https://api.nomoreparties.co')) {
        setIsImgMovie(imgMovie)
      } else {
        setIsImgMovie(`https://api.nomoreparties.co${imgMovie}`)
      }
    }
  }, [location]);

  return (
    <li className="element__list">
      <div className="element__area">
        <p className="element__text">{nameMovie}</p>
        <time className="element__time" dateTime={durationTimeCar}>{durationTime}</time>
        {isEditingCards ?
            <button type="button" aria-label="Знак о добавлении в избранное" onClick={onCardLike} className={
                `element__logo ` + (isLiked ? 'element__logo_active' : 'element__logo_not-active')}>
            </button>
            :
            <button type="button" aria-label="Знак о удалении из избранного" onClick={onCardLike}
                    className="element__logo element__logo_delete">
            </button>
        }
      </div>
      <a href={trailerLink} className="element__link header__transition" target="_blank">
         <img src={isImgMovie} className="element__img" alt="Баннер фильма"/>
      </a>
    </li>
  )
}

export default MoviesCard;