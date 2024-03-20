export const isEmailValid = (email) => {
  // Expresión regular simple para verificar el formato de un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
