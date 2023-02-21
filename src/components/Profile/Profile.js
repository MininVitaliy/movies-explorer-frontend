import {useState, useContext, useEffect} from "react";
import { inputValidProfile, classValidProfile } from '../../contexts/CurrentUserContext';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';

function Profile({handleUpdateUser, onLoading, exit}) {
  const [ isValid, setIsValid ] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState( () => classValidProfile (true));
  const [isValidInfoEmail, setIsValidInfoEmail] = useState({name: '', clasInfo: () => inputValidProfile ('')});
  const [isValidName, setIsValidName] = useState(() => classValidProfile (true));
  const [isValidInfoName, setIsValidInfoName] = useState( {description: '', clasInfo: () =>
        inputValidProfile ('')});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const currentUser = useContext(CurrenUserContext);


  useEffect (() => {
    setEmail(currentUser.user.email);
    setName(currentUser.user.name);
    setIsValid(true)
  }, [currentUser])

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setIsValidEmail(() => classValidProfile (e.target.validity.valid));
    setIsValidInfoEmail( {name: e.target.validationMessage, clasInfo: () =>
      inputValidProfile (e.target.validationMessage)
    });
    setIsValid(e.target.closest('form').checkValidity());
  }

  function handleChangeName(e) {
    setName(e.target.value)
    setIsValidName(() => classValidProfile (e.target.validity.valid));
    setIsValidInfoName( {name: e.target.validationMessage, clasInfo: () =>
      inputValidProfile (e.target.validationMessage)
    });
    setIsValid(e.target.closest('form').checkValidity());
  }

  function handleSubmit (e) {
    e.preventDefault();
    handleUpdateUser({
          email: email,
          name: name,
        },
    );
  }

  return (
      <form className="profile" name='profile-form' onSubmit={handleSubmit} noValidate>
        <div className="profile__form">
          <h2 className='profile__title register__title'>Привет, Виталий!</h2>
          <div className='profile__block'>
            <p className='profile__text'>Имя</p>
            <div className='profile__block-error'>
              <input type="text" name="popup__span_text" className={isValidName}
                     required minLength="5" maxLength="200" onChange={handleChangeName} value={name || ''}/>
              <span className={isValidInfoName.clasInfo()}>{isValidInfoName.name}</span>
            </div>
          </div>
          <div className='profile__block'>
            <p className='profile__text profile__text_margin'>E-mail</p>
            <div className='profile__block-error'>
              <span className={isValidInfoEmail.clasInfo()}>{isValidInfoEmail.name}</span>
              <input type="email" name="popup__span_name" className={isValidEmail}
                     required onChange={handleChangeEmail} value={email || ''}/>
            </div>
          </div>
          <button type="submit" aria-label="Редактирования существующего пользователя"
                  className={`profile__save ` +
                      (isValid ? 'profile__save_valid' : 'profile__save_invalid')} disabled={!isValid}
                  name="register-new-user">{onLoading ? 'Редактировать' : `Редактирую...`}
          </button>
          <button type="button" className="profile__link header__transition" onClick={exit}>Выйти из аккаунта</button>
        </div>
      </form>
  )
}

export default Profile;