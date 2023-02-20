import { useState } from "react";
import { inputValid, classValidRegister } from '../../contexts/CurrentUserContext';
import ExternForm from "../ExternForm/ExternForm";

function Register({onRegister, onLoading}) {
  const [isValid, setIsValid] = useState(false);
  const [isValidName, setIsValidName] = useState( () => classValidRegister (null));
  const [isValidInfoName, setIsValidInfoName] = useState({name: '', clasInfo: () => inputValid ('')});
  const [name, setName] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
    setIsValidName(() => classValidRegister (e.target.validity.valid));
    setIsValidInfoName( {name: e.target.validationMessage, clasInfo: () =>
          inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  }

  function onRegisterCall ({email, password}, {emailStart, passwordStart}) {
    onRegister({
          name: name,
          email: email,
          password: password,
        },
        {
          nameStart: setName,
          emailStart: emailStart,
          passwordStart: passwordStart
        }
    );
  }

  return (
      <>
        <ExternForm
            onLoading={onLoading}
            nameTitle='Добро пожаловать!'
            buttonStart='Зарегистрироваться'
            buttonStop='Регестрируюсь...'
          textInfo="Уже зарегистрированы? "
          textLink='Войти'
          link='/signin'
          setIsValid={setIsValid}
          isValid={isValid}
          infoName='register-form'
          onRegisterCall={onRegisterCall}
          name={
            <>
              <p className='register__text'>Имя</p>
              <input type="text" name="popup__span_text" className={isValidName}
                required minLength="5" maxLength="200" onChange={handleChangeName} value={name || ''}

              />
              <span className={isValidInfoName.clasInfo()}>{isValidInfoName.name}</span>  
            </>
          }
        />
      </>
  )
}

export default Register;