import React from 'react';

function MoreBlocks({moreBlockOnClick}) {
  return (
    <section className="more">
      <button type="button" aria-label="Добавление на страницу еще карточек" className="more__button"
        onClick={moreBlockOnClick}>Ещё
      </button>
    </section>
  )
}

export default MoreBlocks;