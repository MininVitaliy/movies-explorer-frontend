import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <nav className="portfolio__list">
        <a href="https://github.com/MininVitaliy/how-to-learn" target="_blank"
           className="portfolio__cell header__transition">
          <p className="portfolio__info">Статичный сайт</p>
          <p className="portfolio__icon">↗</p>
        </a>
        <a href="https://github.com/MininVitaliy/russian-travel" target="_blank"
           className="portfolio__cell header__transition">
          <p className="portfolio__info">Адаптивный сайт</p>
          <p className="portfolio__icon">↗</p>
        </a>
        <a href="https://github.com/MininVitaliy/express-mesto-gha" target="_blank"
           className="portfolio__cell header__transition">
          <p className="portfolio__info">Одностраничное приложение</p>
          <p className="portfolio__icon">↗</p>
        </a>
      </nav>
    </section>
  )
}

export default Portfolio;