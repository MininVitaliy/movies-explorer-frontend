import React from "react";

export const CurrenUserContext = React.createContext();

export function inputValid (info) {
  if (info.length === 0) {
    return 'register__span register__span_valid'
  } else if (info.length <= 80 && window.innerWidth > 570) {
    return 'register__span register__span_invalid'
  } else if (info.length > 80 && window.innerWidth > 570) {
    return 'register__span register__span_invalid register__span_two-lines'
  } else if (info.length <= 45 && window.innerWidth <= 570) {
    return 'register__span register__span_invalid'
  } else if (info.length > 45 && window.innerWidth <= 570) {
    return 'register__span register__span_invalid register__span_two-lines'
  }
}

export function inputValidProfile (info) {
  if (info) {
    return 'profile__span profile__span_invalid'
  } else {
    return 'profile__span profile__span_valid'
  }
}

export function classValidRegister (info) {
  if (info === true) {
    return `register__input register__input_valid`
  } else if (info === false) {
    return `register__input register__input_invalid`
  } else if (info === null) {
    return `register__input`
  }
}

export function classValidProfile (info) {
  if (info) {
    return `profile__input profile__input_valid`
  } else {
    return `profile__input profile__input_invalid`
  }
}