import { useState, useEffect, useCallback } from "react";
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Result404 from "../Result404/Result404";
import Profile from "../Profile/Profile";
import SaveMovies from "../SavedMovies/SaveMovies";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import InfoToolTip from "../InfoToolTip/InfoTooltip";
import { api } from "../../utils/MoviesApi";
import { apiMe, register, authorize, getContentUser } from "../../utils/MainApi";
import filteringMovies from "../../utils/filteringMovies"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSearch, setIsSearch] = useState(true)
  const [sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [searchResult, setSearchResult] = useState(true)
  const [isMovieRoute, setIsMovieRoute] = useState([])
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState({boolean: false, error: true, text: ''});
  const [isMovieRouteTheRemaining, setIsMovieRouteTheRemaining] = useState([]);
  const [isSavingTheOriginal, setIsSavingTheOriginal] = useState([]);
  const [isCounter, setIsCounter] = useState(0);
  const [isAdditionalMovies, setIsAdditionalMovies] = useState(true);
  const [isAdditionalMoviesTest, setIsAdditionalMoviesTest] =useState(true);
  const [loadingMe, setLoadingMe] = useState(true);
  const [searchResultMe, setSearchResultMe] = useState(true);
  const [isMoviesSaveMe, setIsMoviesSaveMe] = useState([]);
  const [isMoviesDelete, setIsMoviesDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  function openSidebar () {
    setSidebar(true)
  }

  function openInfoPopup (info, text) {
    setIsInfoPopupOpen({boolean: true, error: info, text: text})
  }

  function closeInfoPopup () {
    setIsInfoPopupOpen({boolean: false, error: isInfoPopupOpen.error, text: isInfoPopupOpen.text})
  }

  function setSearchResultMeToggle (info) {
    setSearchResultMe(info)
  }

  function handleLogin() {
    setLoggedIn(true)
  }

  function checkingTheValidityOfTheSearch (cards) {
    setIsMovieRouteTheRemaining([])
    setIsAdditionalMovies(true);
    setIsCounter(0)
    setIsSavingTheOriginal(cards)
    if (cards.length === 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }

    function chunkArray(array, chunk) {
      const newArray = [];
      for (let i = 0; i < array.length; i += chunk) {
        newArray.push(array.slice(i, i + chunk));

      }
      return newArray;
    }

    if (width > 900) {
      let infoNewBig = Math.floor(cards.length / 12);
      if (infoNewBig >= 1) {
        setIsMovieRoute(cards.slice(0, 12));
        setIsMovieRouteTheRemaining(chunkArray(cards.slice(12), 3));
      } else if (infoNewBig < 1) {
        setIsMovieRoute(cards);
        setIsAdditionalMovies(false);
      }
    } else if (width >= 560) {
      let infoNewMiddle = Math.floor(cards.length / 8);
      if (infoNewMiddle >= 1) {
        setIsMovieRoute(cards.slice(0, 8));
        setIsMovieRouteTheRemaining(chunkArray(cards.slice(8), 2));
      } else if (infoNewMiddle < 1) {
        setIsMovieRoute(cards);
        setIsAdditionalMovies(false);
      }
    } else if (width < 560) {
      let infoNewLittle = Math.floor(cards.length / 5);
      if (infoNewLittle >= 1) {
        setIsMovieRoute(cards.slice(0, 5));
        setIsMovieRouteTheRemaining(chunkArray(cards.slice(5), 2));
      } else if (infoNewLittle < 1) {
        setIsMovieRoute(cards);
        setIsAdditionalMovies(false);
      }
    }
  }

  let updatedSetOfCards;
  function moreBlockOnClick() {
    setIsAdditionalMoviesTest(!isAdditionalMoviesTest);
    setIsCounter(isCounter + 1);
    updatedSetOfCards = isMovieRoute.concat(isMovieRouteTheRemaining[isCounter]);
    setIsMovieRoute(updatedSetOfCards);
    if (updatedSetOfCards.length === isSavingTheOriginal.length) {
      setIsAdditionalMovies(false);
    } else  {
      setIsAdditionalMovies(true);
    }
  }

  const registrationUser = useCallback( ({name, email, password}, {nameStart, emailStart, passwordStart}) => {
    setLoading(false);
    register ({name, email, password})
        .then((res) => {
          nameStart('');
          emailStart('');
          passwordStart('');
        })
        .then(() => {
          authorizationUser({email, password});
        })
        .catch((err) => {
          console.log(err);
          if (err === 'Ошибка: 409') {
            openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
                'Пользователь с таким email уже существует. ' +
                'Укажите другой email и попробуйте еще раз.')
          } else {
            openInfoPopup(true, 'Во время запроса произошла ошибка. ' +
                'Возможно, проблема с соединением или сервер недоступен. ' +
                'Подождите немного и попробуйте ещё раз');
          }
        })
        .finally(() => {
          setLoading(true);
        });
  }, []);


  const authorizationUser = useCallback( ({email, password}) => {
    setLoading(false);
    authorize ({email, password})
        .then (() => {
          handleLogin();
          checkToken();
          setIsAdditionalMovies(false);
        })
        .catch((err) => {
          console.log(err)
          openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
              'Возможно, проблема с соединением или сервер недоступен. ' +
              'Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setLoading(true);
        });
  }, []);

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token){
      setIsLoading(true);
      getContentUser(token)
          .then((res) => {
            setCurrentUser(res)
            if (res){
              handleLogin();
              goingToSpecificPageOfTheSite ()
            }
          })
          .then (() => {
            getInitialMoviesMe();
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
  }, []);

  function goingToSpecificPageOfTheSite () {
    if (location.pathname === "/movies") {
      history.push('/movies');
    } else if (location.pathname === "/saved-movies") {
      history.push("/saved-movies")
    } else if (location.pathname === "/") {
      history.push("/")
    } else if (location.pathname === "/profile") {
      history.push("/profile")
    }
  }

  const handleUpdateUser = useCallback (({email, name}) => {
    setLoading(false);
    apiMe.changeUserProfile(email, name)
        .then((res) => {
          setCurrentUser(res);
          openInfoPopup (false,  'Вы успешно изменили профиль!');
        })
        .catch((err) => {
          console.log(err)
          if (err === 'Ошибка: 409') {
            openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
                'Пользователь с таким email уже существует. ' +
                'Укажите другой email и попробуйте еще раз.')
          } else {
            openInfoPopup(true, 'Во время запроса произошла ошибка. ' +
                'Возможно, проблема с соединением или сервер недоступен. ' +
                'Подождите немного и попробуйте ещё раз');
          }
        })
        .finally(() => {
          setLoading(true);
        });
  }, []);

  function closeSidebar () {
    setSidebar(false);
  }

  const mobileWindow = useCallback( () => {
    if (width > 900) {
      setIsMobile(true);
      setSidebar(false);
    } else if (width > 560) {
      setIsSearch(true);
      setIsMobile(false);
    } else {
      setIsMobile(false);
      setIsSearch(false);
    }
  }, [width]);


  useEffect (() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem('last request') !== null) {
      cards = JSON.parse(localStorage.getItem('last request'));
      checkingTheValidityOfTheSearch(cards.movies)
    }
  }, [location]);

  useEffect(() => {
    mobileWindow ();
  }, []);

  useEffect (() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    });
    mobileWindow ();
    cards = JSON.parse(localStorage.getItem('last request'));
    if (loggedIn === true && cards !== null) {
      checkingTheValidityOfTheSearch(cards.movies || '')
    }
  }, [window.innerWidth]);

  useEffect (() => {
    if (loggedIn === true) {
      setLoadingMe(false);
    }
  }, []);

  useEffect (() => {
    if (isMoviesSaveMe.length === 0) {
      setSearchResultMe(false);
    }
  }, [isMoviesSaveMe]);


  useEffect (() => {
    cards = JSON.parse(localStorage.getItem('last request'));
    if (cards === null) {
      setIsAdditionalMovies(false);
    }
    if (loggedIn === true && cards !== null) {
      checkingTheValidityOfTheSearch(cards.movies)
    }
  }, []);

  let cards;
  const getInitialMovies = useCallback((name, shortFilms) => {
    setIsAdditionalMovies(false);
    setLoading(false);
    api.getInitialMovies()
        .then((res) => {
          localStorage.setItem('last request', JSON.stringify({
            name: name,
            movies: filteringMovies(res, name, shortFilms),
            shortFilms: shortFilms,
          }));
        })
        .then(() => {
          cards = JSON.parse(localStorage.getItem('last request'));
          checkingTheValidityOfTheSearch(cards.movies);
        })
        .catch(err => {
          console.log(err);
          openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
              'Возможно, проблема с соединением или сервер недоступен. ' +
              'Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setLoading(true);
        });
  }, []);

  const getInitialMoviesMe = useCallback(() => {
    apiMe.getInitialCards()
        .then((res) => {
          setIsMoviesSaveMe(res);
          if (res.length === 0) {
            setSearchResultMe(false);
          } else {
            setSearchResultMe(true);
          }
        })
        .catch(err => {
          console.log(err);
          openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
            'Возможно, проблема с соединением или сервер недоступен. ' +
            'Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setLoadingMe(true);
        });
  }, []);

  const addNewCardMovies = useCallback((card,  image, thumbnail) => {
    apiMe.addNewCardOnTheServer(card, image, thumbnail)
        .then((res) => {
          setIsMoviesSaveMe([res, ...isMoviesSaveMe]);
          return res;
        })
        .then(() => {
          if (isMoviesSaveMe.length >= 0) {
            setSearchResultMe(true);
          }
        })
        .catch(err => {
          console.log(err)
          openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
            'Возможно, проблема с соединением или сервер недоступен. ' +
            'Подождите немного и попробуйте ещё раз');
        })
  }, [isMoviesSaveMe]);

  const deleteCardMovies = useCallback((cardId) => {
    apiMe.deleteCardTheServer(cardId)
        .then(() => {
          setIsMoviesSaveMe((state) => state.filter((c) => c._id === cardId ? '' : c));
          setIsMoviesDelete(cardId);
        })
        .catch(err => {
          console.log(err);
          openInfoPopup (true, 'Во время запроса произошла ошибка. ' +
            'Возможно, проблема с соединением или сервер недоступен. ' +
            'Подождите немного и попробуйте ещё раз');
        })
  }, []);

  const exit = useCallback( () => {
    localStorage.removeItem('token');
    localStorage.removeItem('last request');
    setLoggedIn(false);
    setCurrentUser({});
    setIsMovieRoute([])
  }, []);

  return (
      <CurrenUserContext.Provider value={currentUser}>
          {location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile' ?
            <Header
              registered={loggedIn}
              isMobile={isMobile}
              openSidebar={openSidebar}
              sidebar={sidebar}
              closeSidebar={closeSidebar}
            />
            :
            ''
          }
          <Switch>
            <ProtectedRoute path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              isSearch={isSearch}
              onOpenPopup={openInfoPopup}
              getMovies={getInitialMovies}
              cards={isMovieRoute}
              loading={loading}
              searchResult={searchResult}
              location={location}
              isAdditionalMovies={isAdditionalMovies}
              moreBlockOnClick={moreBlockOnClick}
              addNewCardMovies={addNewCardMovies}
              deleteCardMovies={deleteCardMovies}
              isMoviesSaveMe={isMoviesSaveMe}
              isLoading={isLoading}
            />

            <ProtectedRoute path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleUpdateUser={handleUpdateUser}
              onLoading={loading}
              exit={exit}
              isLoading={isLoading}
            />

            <ProtectedRoute path="/saved-movies"
              component={SaveMovies}
              loggedIn={loggedIn}
              location={location}
              isSearch={isSearch}
              isMoviesSaveMe={isMoviesSaveMe}
              loading={loadingMe}
              searchResult={searchResultMe}
              deleteCardMovies={deleteCardMovies}
              setSearchResultMeToggle={setSearchResultMeToggle}
              isMoviesDelete={isMoviesDelete}
              isLoading={isLoading}
            />
            <Route path="/signup">
              {loggedIn ?
                <Redirect to="/movies" />
                :
                <Register
                  onRegister={registrationUser}
                  onLoading={loading}
                />}
            </Route>
            <Route path="/signin">
              {loggedIn ?
                <Redirect to="/movies" />
                :
                <Login
                  onLogin={authorizationUser}
                  onLoading={loading}
                />}
            </Route>
            <Route path="/404">
              <Result404/>
            </Route>

            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/404" />}
            </Route>
          </Switch>
          {location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ?
              <Footer />
              :
              ''
          }
          <InfoToolTip
            isOpen={isInfoPopupOpen}
            onClose={closeInfoPopup}
          />
      </CurrenUserContext.Provider>
  );
}

export default App;