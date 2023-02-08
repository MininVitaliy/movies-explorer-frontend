import React from 'react';
import magnifier from '../../images/iconsearch.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({shortFilms, onClick, isSearch}) {
  function switchingShortFilms() {
    onClick(!shortFilms);
  }

  return (
      <section className="search">
        <form className="form" name="form_search"
              /*noValidate onSubmit={}*/>
          {isSearch ?
            <>
              <img src={magnifier} className="form__logo" alt="Поиск"/>
              <input type="text" placeholder="Фильм" name="form-search" className="form__input"
                /*required minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''}*//>
              <button type="submit" aria-label="Отправить запрос" className="form__submit"
                /*onClick={() => onClose(name)}*/>
              </button>
              <FilterCheckbox shortFilms={shortFilms} switchingShortFilms={switchingShortFilms} />
            </>
            :
            <>
              <div className="form__mobile">
                <input type="text" placeholder="Фильм" name="form-search" className="form__input"
                  /*required minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''}*//>
                <button type="submit" aria-label="Отправить запрос" className="form__submit"
                  /*onClick={() => onClose(name)}*/>
                </button>
              </div>
              <FilterCheckbox
                shortFilms={shortFilms}
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