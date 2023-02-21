import { useState } from 'react';
import ExternForm from "../ExternForm/ExternForm";

function Login({onLogin, onLoading}) {
  const [isValid, setIsValid] = useState(false);

  function onRegisterCall ({email, password}) {
    onLogin({
      email: email,
      password: password,  
    });
  }

  return (
    <>
      <ExternForm
        onLoading={onLoading}
        nameTitle='Рады видеть!'
        buttonStart='Войти'
        buttonStop='Авторизируюсь...'
        textInfo="Ещё не зарегистрированы? "
        textLink='Регистрация'
        link='/signup'
        classIndent='login'
        infoName='login-form'
        setIsValid={setIsValid}
        isValid={isValid}
        onRegisterCall={onRegisterCall}
      />
    </>
  )
}

export default Login;