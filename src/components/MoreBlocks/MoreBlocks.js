import React from 'react';

function MoreBlocks({moreBlockOnClick, isAdditionalMovies }) {
  return (
    <section className="more">
      {isAdditionalMovies ?
        <button type="button" aria-label="Добавление на страницу еще карточек" className="more__button"
          onClick={moreBlockOnClick}>Ещё
        </button>
        :
        ''
      }
    </section>
  )
}

export default MoreBlocks;