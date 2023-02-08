import React from 'react';

function AboutProject() {
  return (
      <section className="project" id="project">
        <p className="info__student">O проекте</p>
        <div className="project__block">
          <div>
            <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
            <p className="project__text">Составление плана, работу над бэкендом,
              вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div>
            <h3 className="project__title project__title_margin">На выполнение диплома ушло 5 недель</h3>
            <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__chart">
          <p className="project__signatures project__signatures_background_green">1 неделя</p>
          <p className="project__signatures project__signatures_background_gray">4 недели</p>
          <p className="project__signatures project__signatures_color">Back-end</p>
          <p className="project__signatures project__signatures_color">Front-end</p>
        </div>
      </section>
  )
}

export default AboutProject;