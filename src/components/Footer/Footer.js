import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info footer__info_color">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__block">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__list">
          <li className="footer__cell">
            <p className="footer__info">Яндекс.Практикум</p>
          </li>
          <li className="footer__cell">
            <p className="footer__info">Github</p>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;