import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { general } from "../../../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { handleAxiosError } from "../../../../utils/axiosErrorHandler";

export const ProfileData = ({ userData, handleSave }) => {
  const [editMode, setEditMode] = useState(false);

  // Datos de usuario por defecto
  const userData1 = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const [formData, setFormData] = useState(userData1);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData(userData); // Reset form data on cancel
  };

  const handleSaveClick = (updatedData) => {
    handleSave(updatedData);
    setEditMode(false);
  };
  
  // const { id } = userData;

  useEffect(() => {
    

    general("get", "user/profile", userData, null)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  }, []);

  return (
    <Box>
      {editMode ? (
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSaveClick}
          handleCancel={handleCancelClick}
        />
      ) : (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Nombre:</Typography>
            <Typography variant="body2">{userData1.name}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body2">{userData1.email}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Modificar
          </Button>
        </Box>
      )}
    </Box>
  );
};
