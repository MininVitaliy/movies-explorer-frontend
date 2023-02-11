import React from 'react';

function FilterCheckbox({shortFilms, switchingShortFilms}) {
  return (
      <div className="form__block">
        <button type="button" aria-label="Выбор типа фильмов" name="filter-checkbox" className={`form__button ` +
          (shortFilms ? 'form__button_on' : '' )} onClick={() => switchingShortFilms()}>
        </button>
        <label className="form__text">Короткометражки</label>
      </div>
  )
}

export default FilterCheckbox;