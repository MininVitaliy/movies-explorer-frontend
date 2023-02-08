import React, { useState } from "react";
import { inputValid, classValidRegister } from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";

function ExternForm ({infoName, name, textInfo, textLink, link, nameTitle, text, classIndent, setIsValidName, isValid, setIsValid}) {
  const [isvalidEmail, setIsValidEmail] = useState( () => classValidRegister (null));
  const [isValidInfoEmail, setIsValidInfoEmail] = useState({name: '', clasInfo: () => inputValid ('')});
  const [isvalidPassword, setIsValidPassword] = useState(() => classValidRegister (null));
  const [isvalidInfoPassword, setIsValidInfoPassword] = useState( {description: '', clasInfo: () =>
    inputValid ('')});

  function handleChangeEmail(e) {
    console.log(setIsValidName)
    setIsValidEmail(() => classValidRegister (e.target.validity.valid));
    setIsValidInfoEmail( {name: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  }

  function handleChangePassword(e) {
    setIsValidPassword(() => classValidRegister (e.target.validity.valid))
    setIsValidInfoPassword({description: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  }
 
  return (
    <form className="register" name={infoName} /*onSubmit={handleSubmit}*/ noValidate>
      <div className="register__form">
        <Link to="/" className="register__logo header__logo header__transition"></Link>
        <h2 className='register__title'>{nameTitle}</h2>
        {name}
        <p className='register__text'>E-mail</p>
        <input type="email" name="popup__span_email" className={isvalidEmail}
          required  onChange={handleChangeEmail} />
        <span className={isValidInfoEmail.clasInfo()}>{isValidInfoEmail.name}</span>
        <p className='register__text'>Пароль</p>
        <input type="password"  name="popup__span_password" className={isvalidPassword}
          required minLength="5" maxLength="200" onChange={handleChangePassword} />
        <span className={isvalidInfoPassword.clasInfo()}>{isvalidInfoPassword.description}</span>
        <button type="submit" aria-label="Регистрация нового пользователя" className={` register__save ` +
          classIndent + (isValid ? ' register__save_valid' : ' register__save_invalid')}
          disabled={!isValid} name="register-new-user">{text}
        </button>
        <p className="register__info">{textInfo}
          <Link to={link} className="register__link header__transition">{textLink}</Link>
        </p>
      </div>
    </form>
  )
}

export default ExternForm;
