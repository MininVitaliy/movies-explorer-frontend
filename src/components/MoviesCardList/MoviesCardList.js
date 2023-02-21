import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList ({cards,
                           loading,
                           searchResult,
                           location,
                           deleteCardMovies,
                           addNewCardMovies,
                           isMoviesSaveMe,
                           searchMovies,
                           searchNewMovies }) {

  const [isEditingCards, setIsEditingCards] =useState(true);

  useEffect(() => {
    if (location.pathname === "/movies" ) {
      setIsEditingCards(true)
    } else if (location.pathname === "/saved-movies") {
      setIsEditingCards(false)
    }
  }, [location]);

  return (
      <section className="element">
        {loading ?
            <>
              {searchResult ?
                <>
                  {searchMovies ?
                    <>
                      <ul className="element__lists">
                        {cards.map((item) =>
                          <MoviesCard
                            key={item.id || item._id}
                            nameMovie={item.nameRU}
                            duration={item.duration}
                            imgMovie={item.image.url || item.image}
                            trailerLink={item.trailerLink}
                            isEditingCards={isEditingCards}
                            deleteCardMovies={deleteCardMovies}
                            id={item}
                            addNewCardMovies={addNewCardMovies}
                            isMoviesSaveMe={isMoviesSaveMe}
                          />
                        )}
                      </ul>
                    </>
                    :
                    <>
                      <ul className="element__lists">
                        {searchNewMovies.map((item) =>
                          <MoviesCard
                            key={item.id || item._id}
                            nameMovie={item.nameRU}
                            duration={item.duration}
                            imgMovie={item.image.url || item.image}
                            trailerLink={item.trailerLink}
                            isEditingCards={isEditingCards}
                            deleteCardMovies={deleteCardMovies}
                            id={item}
                            addNewCardMovies={addNewCardMovies}
                            isMoviesSaveMe={isMoviesSaveMe}
                          />
                        )}
                      </ul>
                    </>
                  }
                </>
                :
                <p className="element__info">Ничего не найдено</p>
              }
            </>
            :
            <Preloader />
        }
      </section>
  )
}

export default MoviesCardList;