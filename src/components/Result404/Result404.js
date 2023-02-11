import React from 'react';
import { useHistory } from "react-router-dom";

function Result404() {
  let history = useHistory();
  function goingBack () {
    history.goBack();
  }
  return (
      <section className="error">
        <h2 className="error__title">404</h2>
        <p className="error__text">Страница не найдена</p>
        <button type='button' className="error__link header__transition" onClick={goingBack}>Назад</button>
      </section>
  )
}

export default Result404;