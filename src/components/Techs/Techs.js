import React from 'react';

function Techs() {
  return (
      <section className="techs" id="techs">
        <p className="info__student">Технологии</p>
        <div className="techs__block">
          <h2 className="techs__position info__title">7 технологий</h2>
          <p className="techs__size info__live">На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__cell">
              <p className="techs__info">HTML</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">CSS</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">JS</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">React</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">Git</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">Express.js</p>
            </li>
            <li className="techs__cell">
              <p className="techs__info">mongoDB</p>
            </li>
          </ul>
        </div>
      </section>
  )
}

export default Techs;