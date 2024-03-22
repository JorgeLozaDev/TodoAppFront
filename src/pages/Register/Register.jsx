import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ToastContainer, Toasty } from "../../common/CustomToasty/CustomToasty";
import { general } from "../../services/apiCalls";
import RegisterForm from "./Components/RegisterForm";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
import { isEmailValid } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      // Llamada a la función general para el login

      handleRegistrationAndLogin(formData);
    }
  };
  async function handleRegistrationAndLogin(formData) {
    try {
      //primero añadimos el usuario
      const registerResponse = await general(
        "post",
        "user/addUser",
        null,
        formData
      );
      //despues de añadirlo hacemos el login
      const loginResponse = await general("post", "user/login", null, formData);
      dispatch(login({ credentials: loginResponse.data.token }));

      Toasty({
        message: `Usuario registrado correctamente. Iniciando sesión...`,
        type: "success",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 2500);
    } catch (error) {
      handleAxiosError(error);
    }
  }

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
