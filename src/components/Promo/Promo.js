import React from 'react';
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
      <section className="promo">
        <div className="promo__block">
          <h1 className="promo__position info__title">Учебный проект студента факультета Веб-разработки.</h1>
          <NavTab />
        </div>
      </section>
  )
}

export default Promo;