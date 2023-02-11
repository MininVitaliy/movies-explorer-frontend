import React from 'react';

function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__cell">
          <a href="/#project" className="nav__link header__transition">О проекте</a>
        </li>
        <li className="nav__cell">
          <a href="/#techs" className="nav__link header__transition">Технологии</a>
        </li>
        <li className="nav__cell">
          <a href="/#student" className="nav__link header__transition">Студент</a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab;