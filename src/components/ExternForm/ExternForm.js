import React, { useState } from "react";
import {inputValid, classValidRegister, inputValidProfile, classValidProfile} from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";

function ExternForm ({infoName,
                       name,
                       textInfo,
                       textLink,
                       link,
                       nameTitle,
                       buttonStart,
                       buttonStop,
                       classIndent,
                       isValid,
                       setIsValid,
                       onRegisterCall,
                       onLoading}) {
                        
  const [isValidEmail, setIsValidEmail] = useState( () => classValidRegister (null));
  const [isValidInfoEmail, setIsValidInfoEmail] = useState({name: '', clasInfo: () => inputValid ('')});
  const [isValidPassword, setIsValidPassword] = useState(() => classValidRegister (null));
  const [isValidInfoPassword, setIsValidInfoPassword] = useState( {description: '', clasInfo: () =>
    inputValid ('')});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setIsValidInfoEmail( {name: e.target.validationMessage, clasInfo: () =>
          inputValid (e.target.validationMessage)
    });
    setIsValid(e.target.closest('form').checkValidity());

    if (isEmail(e.target.value)) {
      setIsValidEmail(() => classValidRegister (true));
    } else {
      setIsValidEmail(() => classValidRegister (false));
      setIsValid(false);
      if (e.target.validationMessage.length ===  0) {
        setIsValidInfoEmail({
          name: 'Некорректый адрес почты', clasInfo: () =>
              inputValid('Некорректый адрес почты')
        });
      }
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setIsValidPassword(() => classValidRegister (e.target.validity.valid))
    setIsValidInfoPassword({description: e.target.validationMessage, clasInfo: () =>
      inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  }

  function handleSubmit (e) {
    e.preventDefault();
    onRegisterCall({
          email: email,
          password: password,
        },
        {
          emailStart: setEmail,
          passwordStart: setPassword
        }
    );
  }

  return (
    <form className="register" name={infoName} onSubmit={handleSubmit} noValidate>
      <div className="register__form">
        <Link to="/" className="register__logo header__logo header__transition"></Link>
        <h2 className='register__title'>{nameTitle}</h2>
        {name}
        <p className='register__text'>E-mail</p>
        <input type="email" name="popup__span_email" className={isValidEmail}
          required  onChange={handleChangeEmail} value={email || ''}
        />
        <span className={isValidInfoEmail.clasInfo()}>{isValidInfoEmail.name}</span>
        <p className='register__text'>Пароль</p>
        <input type="password"  name="popup__span_password" className={isValidPassword}
          required minLength="5" maxLength="200" onChange={handleChangePassword} value={password || ''}
        />
        <span className={isValidInfoPassword.clasInfo()}>{isValidInfoPassword.description}</span>
        <button type="submit" aria-label="Регистрация нового пользователя" className={` register__save ` +
          classIndent + (isValid ? ' register__save_valid' : ' register__save_invalid')}
          disabled={!isValid} name="register-new-user">{onLoading ? `${buttonStart}` : `${buttonStop}`}
        </button>
        <p className="register__info">{textInfo}
          <Link to={link} className="register__link header__transition">{textLink}</Link>
        </p>
      </div>
    </form>
  )
}

export default ExternForm;
