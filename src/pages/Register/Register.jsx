import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import RegisterForm from "./Components/RegisterForm";
import { general } from "../../services/apiCalls";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isEmailValid = (email) => {
    // Expresión regular simple para verificar el formato de un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones al hacer submit
    const newErrors = {
      username: formData.username ? "" : "Este campo es obligatorio",
      email: isEmailValid(formData.email)
        ? ""
        : "Por favor, introduce un email válido",
      password:
        formData.password.length >= 6
          ? ""
          : "La contraseña debe tener al menos 6 caracteres",
    };

    setErrors(newErrors);

    // Comprobar si hay errores antes de continuar
    if (Object.values(newErrors).every((error) => error === "")) {
      // Realizar acciones de envío o validación final aquí
      // Llamada a la función general para el login
      general("post", "user/addUser", null, formData)
        .then((data) => {
          // Lógica después de la llamada exitosa
          Toasty({
            message: "Datos correctos ...logueando",
            type: "success",
          });

          // dispatch(login({ credentials: data.token }));

          // setTimeout(() => {
          //   navigate("/profile");
          // }, 2500);
        })
        .catch((error) => {
          // Lógica de manejo de errores
          // Manejar el error de Axios
          if (error.response) {
            // El servidor respondió con un código de estado diferente de 2xx
            Toasty({
              message: `Error: ${error.response.status} - ${error.response.data.message}`,
              type: "error",
            });
          } else if (error.request) {
            // La solicitud fue hecha, pero no se recibió una respuesta
            Toasty({
              message: "No se recibió respuesta del servidor",
              type: "error",
            });
          } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            Toasty({
              message: "Error al configurar la solicitud",
              type: "error",
            });
          }
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <RegisterForm
              formData={formData}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
