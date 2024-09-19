import { Textarea } from "@mui/joy";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toasty } from "../../../../../common/CustomToasty/CustomToasty";
import { isEmailValid, isTokenExpired } from "../../../../../utils/helpers";
import { logout, userDetails } from "../../../../userSlice";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

dayjs.updateLocale("es", {
  // Sunday = 0, Monday = 1.
  weekStart: 1,
});

export const TodoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(dayjs());

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const token = useSelector(userDetails);
  useEffect(() => {
    if (isTokenExpired(token.credentials)) {
      dispatch(logout()); // Despacha la acción de logout
      navigate("/"); // Navega a la página de inicio o login después del logout
    }
  }, []);

  const onSubmit = (event) => {
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
      Toasty({
        message: `Datos correctos ...logueando`,
        type: "success",
      });
    }
  };
  const handleInputChange = () => {};
  const handleCancelClick = () => {};

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="md">
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              disabled
              fullWidth
              id="tituloTarea"
              label="titulo tarea"
              name="tituloTarea"
              onChange={handleInputChange}
              // error={Boolean(errors.email)}
              FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Textarea
              color="neutral"
              minRows={3}
              placeholder="Descripción de la tarea"
              size="lg"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="es"
              timezone="Europe/Paris"
            >
              <DemoContainer components={["MobileDateTimePicker"]}>
                <DemoItem label="Mobile variant">
                  <MobileDateTimePicker
                    disablePast={true}
                    defaultValue={value}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              disabled
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="nombre"
              onChange={handleInputChange}
              error={Boolean(errors.name)}
              FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
            />
          </Box>
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", height: "20px" }}
          >
            {errors.email}
          </Typography>
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", height: "20px" }}
          >
            {errors.name}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              error={Boolean(errors.password)}
              FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
            />
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", height: "20px" }}
            >
              {errors.password}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
