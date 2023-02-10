import { useContext }  from "react";
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList () {
  const currentUser = useContext(CurrenUserContext);
  return (
      <section className="element">
        <ul className="element__lists">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </section>
  )
}

export default MoviesCardList;