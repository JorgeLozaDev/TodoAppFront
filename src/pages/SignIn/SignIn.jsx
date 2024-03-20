import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ToastContainer } from "../../common/CustomToasty/CustomToasty";
import { general } from "../../services/apiCalls";
import { handleAxiosError } from "../../utils/axiosErrorHandler";
import SignInForm from "./Components/SignInForm";
import { isEmailValid } from "../../utils/helpers";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones al hacer submit
    const newErrors = {
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
      general("post", "user/login", null, formData)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          // Manejar el error de Axios utilizando la función importada
          handleAxiosError(error);
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
    <>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <SignInForm
              formData={formData}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
