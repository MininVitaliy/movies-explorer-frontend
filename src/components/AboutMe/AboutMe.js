import React from 'react';
import student from "../../images/pic__COLOR_pic.svg";

function AboutMe() {
  return (
      <section className="info" id="student">
        <p className="info__student">Студент</p>
        <div className="info__block">
          <div className="info__resume">
            <div>
              <h2 className="info__title info__title_margin">Виталий</h2>
              <p className="info__subtitle">Фронтенд-разработчик, 30 лет</p>
              <p className="info__live">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015
                года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
            </div>
            <p className="info__developers">Github</p>
          </div>
          <img src={student} className="info__smile" alt="Логотип Diploma"/>
        </div>
      </section>
  )
}

export default AboutMe;