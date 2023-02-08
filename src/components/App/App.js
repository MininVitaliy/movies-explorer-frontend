import { useState, useEffect, useCallback } from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import { CurrenUserContext, CurrenCardContext } from '../../contexts/CurrentUserContext';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Result404 from "../Result404/Result404";
import Profile from "../Profile/Profile";
import SaveMovies from "../SavedMovies/SaveMovies";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

function App() {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isShortFilmsMovies, setIsShortFilmsMovies] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentMoviesCard, setCurrentCard] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isSearch, setIsSearch] = useState(true)
  const [sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function openSidebar () {
    setSidebar(true)
  };

  function closeSidebar () {
    setSidebar(false)
  }

  useEffect(() => {
    mobileWindow ();
  }, []);

  const mobileWindow = useCallback( () => {
    if (width > 900) {
      setIsMobile(true)
      setSidebar(false)
    } else if (width > 560) {
      setIsSearch(true)
      setIsMobile(false)
    } else {
      setIsMobile(false)
      setIsSearch(false)
    }
  }, [width]);

  useEffect (() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    });
    mobileWindow ()
  }, [window.innerWidth]);

  return (
      <CurrenUserContext.Provider value={currentUser}>
        <CurrenCardContext.Provider value={currentMoviesCard}>
          <Switch>
            <Route path="/signup">
              <Register/>
            </Route>
            <Route path="/signin">
              <Login/>
            </Route>
            <Route path="/movies">
              <Header
                registered={loggedIn}
                isMobile={isMobile}
                openSidebar={openSidebar}
                sidebar={sidebar}
                closeSidebar={closeSidebar}
              />
              <Movies
                  isShortFilms={isShortFilmsMovies}
                  setIsShortFilms={setIsShortFilmsMovies}
                  isSearch={isSearch}
              />
              <Footer />
            </Route>
            <Route path="/profile">
              <Header
                registered={loggedIn}
                isMobile={isMobile}
                openSidebar={openSidebar}
                sidebar={sidebar}
                closeSidebar={closeSidebar}
              />
              <Profile />
            </Route>
            <Route path="/saved-movies">
              <Header
                registered={loggedIn}
                isMobile={isMobile}
                openSidebar={openSidebar}
                sidebar={sidebar}
                closeSidebar={closeSidebar}
              />
              <SaveMovies
                isShortFilms={isShortFilms}
                setIsShortFilms={setIsShortFilms}
                isSearch={isSearch}
              />
              <Footer />
            </Route>
            <Route path="/404">
              <Result404/>
            </Route>
            <Route exact path="/">
              <Header
                registered={loggedIn}
                isMobile={isMobile}
                openSidebar={openSidebar}
                sidebar={sidebar}
                closeSidebar={closeSidebar}
              />
              <Main />
              <Footer />
            </Route>
            <Route exact path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/404" />}
            </Route>
          </Switch>
        </CurrenCardContext.Provider>
      </CurrenUserContext.Provider>
  );
}

export default App;