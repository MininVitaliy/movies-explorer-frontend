import { useState } from 'react';
import ExternForm from "../ExternForm/ExternForm";

function Login() {
  const [isValid, setIsValid] = useState(false);
  return (
    <>
      <ExternForm
        nameTitle='Рады видеть!'
        text='Войти'
        textInfo="Ещё не зарегистрированы? "
        textLink='Регистрация'
        link='/signup'
        classIndent='login'
        infoName='login-form'
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </>
  )
}

export default Login;