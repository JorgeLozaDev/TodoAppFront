import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { general } from "../../../../services/apiCalls";
import { handleAxiosError } from "../../../../utils/axiosErrorHandler";
import { ProfileForm } from "../ProfileForm/ProfileForm";

export const ProfileData = ({ userData, handleSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  // Datos de usuario por defecto

  const [userDataInicial, setuserDataInicial] = useState({
    nombre: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: null,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData(userDataInicial); // Reset form data on cancel
  };

  const handleSubmit = (event) => {
    // handleSave(updatedData);
    setEditMode(false);
  };

  // const { id } = userData;

  useEffect(() => {
    general("get", "user/profile", userData, null)
      .then((data) => {
        setFormData(data.data);
        setuserDataInicial(data.data);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  }, []);

  const validate = (fieldValues = formData) => {
    let tempErrors = { ...errors };

    if ("name" in fieldValues)
      tempErrors.name = fieldValues.name
        ? fieldValues.name.length >= 3
          ? ""
          : "El nombre debe tener al menos 3 caracteres."
        : "El nombre es requerido.";
    if ("email" in fieldValues)
      tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
        ? ""
        : "Email no válido.";

    if ("password" in fieldValues)
      tempErrors.password.length >= 6
        ? ""
        : "La contraseña debe tener al menos 6 caracteres";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate({ [name]: value });
  };

  return (
    <Box>
      {editMode ? (
        <ProfileForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleCancelClick={handleCancelClick}
          errors={errors}
        />
      ) : (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Nombre:</Typography>
            <Typography variant="body2">{userDataInicial.nombre}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body2">{userDataInicial.email}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Modificar
          </Button>
        </Box>
      )}
    </Box>
  );
};
