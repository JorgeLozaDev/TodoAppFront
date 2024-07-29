import { jwtDecode } from "jwt-decode";

export const isEmailValid = (email) => {
  // Expresión regular simple para verificar el formato de un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isTokenExpired = (token) => {
  const decode = jwtDecode(token);
  return Date.now() > decode.exp * 1000;
};
