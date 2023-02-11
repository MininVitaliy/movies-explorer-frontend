import { useState }  from "react";

function MoviesCard() {
  const [isLiked, setIsLiked] = useState(true);
  function onCardLike() {
    setIsLiked(!isLiked)
  }
  return (
    <li className="element__list">
      <div className="element__area">
        <p className="element__text">33 слова о дизайне</p>
        <time className="element__time" dateTime="1h 47m">1ч 47м</time>
        <button type="button" aria-label="Знак о добавлении в избранное" onClick={onCardLike} className={
          `element__logo` + ' ' + (isLiked ? 'element__logo_active' : 'element__logo_not-active')}>
        </button>
      </div>
      <img src="https://veloinsider.ru/wp-content/uploads/2016/01/SLorence_GiantReign_001.jpg"
        className="element__img" alt="Знак о добавлении в избранное"/>
    </li>
  )
}

export default MoviesCard;