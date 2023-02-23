import React from 'react';
import {Link} from "react-router-dom";

function Navigation({registered, isMobile, openSidebar, sidebar, closeSidebar}) {
  return (
    <>
      <div className="header__row">
        <Link to="/" className="header__logo header__transition"></Link>
        {isMobile ?
          <>
            {registered ?
              <nav>
                <Link to="/movies" className="header__link header__transition header__link_principal">Фильмы</Link>
                <Link to="/saved-movies" className="header__link header__transition">Сохранённые фильмы</Link>
              </nav>
              :
              ''
            }
          </>
          :
          ''
        }
      </div>
      {isMobile ?
        <>
          {registered ?
            <nav className="header__area">
              <Link to="/profile" className="header__profile header__transition">Аккаунт</Link>
            </nav>
            :
            <nav className="header__area-not-authorized">
              <Link to="/signup" className="header__not-authorized header__transition">Регистрация</Link>
              <Link to="/signin"
                className="header__not-authorized header__transition header__not-authorized_background">
                Войти</Link>
            </nav>
          }
        </>
        :
        <>
          {registered ?
            <>
              <div className="header__image header__transition" onClick={openSidebar}></div>
              <div className={`header__sidebar-background ` + (sidebar ? 'header__sidebar-background_open' : '')}></div>
              <div className={`header__sidebar ` + (sidebar ? 'header__sidebar_open ' : '')}>
                <button type="button" aria-label="Закрытие сайдбара" className="header__close header__transition"
                  onClick={closeSidebar}>
                </button>
                <nav className='header__sidebar-block'>
                  <Link to="/" className="header__sidebar-link header__transition" onClick={closeSidebar}>
                    Главная</Link>
                  <Link to="/movies" className="header__sidebar-link header__transition" onClick={closeSidebar}>
                    Фильмы</Link>
                  <Link to="/saved-movies" className="header__sidebar-link header__transition"
                    onClick={closeSidebar}>Сохранённые фильмы</Link>
                  <div className="header__area header__area_position">
                    <Link to="/profile" className="header__profile header__transition" onClick={closeSidebar}>
                      Аккаунт</Link>
                  </div>
                </nav>
              </div>
            </>
            :
            <nav className="header__area-not-authorized">
              <Link to="/signup" className="header__not-authorized header__transition">Регистрация</Link>
              <Link to="/signin"
                className="header__not-authorized header__transition header__not-authorized_background">
                Войти</Link>
            </nav>
          }
        </>
      }
    </>
  )
}

export default Navigation;