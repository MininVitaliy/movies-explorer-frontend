import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__cell">
          <p className="portfolio__info">Статичный сайт</p>
          <a href="https://github.com/MininVitaliy/how-to-learn" target="_blank"
                className="portfolio__icon header__transition">↗</a>
        </li>
        <li className="portfolio__cell">
          <p className="portfolio__info">Адаптивный сайт</p>
          <a href="https://github.com/MininVitaliy/russian-travel" target="_blank"
                className="portfolio__icon header__transition">↗</a>
        </li>
        <li className="portfolio__cell">
          <p className="portfolio__info">Одностраничное приложение</p>
          <a href="https://github.com/MininVitaliy/express-mesto-gha" target="_blank"
                className="portfolio__icon header__transition">↗</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;