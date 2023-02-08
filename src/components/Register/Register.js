import { useState } from "react";
import { inputValid, classValidRegister } from '../../contexts/CurrentUserContext';
import ExternForm from "../ExternForm/ExternForm";

function Register() {
  const [isValid, setIsValid] = useState(false);
  const [isvalidName, setIsValidName] = useState( () => classValidRegister (null));
  const [isValidInfoName, setIsValidInfoName] = useState({name: '', clasInfo: () => inputValid ('')});

  function handleChangeName(e) {
    setIsValidName(() => classValidRegister (e.target.validity.valid));
    setIsValidInfoName( {name: e.target.validationMessage, clasInfo: () =>
          inputValid (e.target.validationMessage)});
    setIsValid(e.target.closest('form').checkValidity());
  }

  return (
      <>
        <ExternForm
          nameTitle='Добро пожаловать!'
          text='Зарегистрироваться'
          textInfo="Уже зарегистрированы? "
          textLink='Войти'
          link='/signin'
          setIsValid={setIsValid}
          isValid={isValid}
          infoName='register-form'
          name={
            <>
              <p className='register__text'>Имя</p>
              <input type="text" name="popup__span_text" className={isvalidName}
                required minLength="5" maxLength="200" onChange={handleChangeName}/>
              <span className={isValidInfoName.clasInfo()}>{isValidInfoName.name}</span>  
            </>
          }
        />
      </>
  )
}

export default Register;