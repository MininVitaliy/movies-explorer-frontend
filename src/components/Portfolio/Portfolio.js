import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__cell">
          <p className="portfolio__info">Статичный сайт</p>
          <p className="portfolio__icon">↗</p>
        </li>
        <li className="portfolio__cell">
          <p className="portfolio__info">Адаптивный сайт</p>
          <p className="portfolio__icon">↗</p>
        </li>
        <li className="portfolio__cell">
          <p className="portfolio__info">Одностраничное приложение</p>
          <p className="portfolio__icon">↗</p>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;