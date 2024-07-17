import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {ProfileForm} from '../ProfileForm/ProfileForm';

export const ProfileData = ({ userData, handleSave }) => {
  const [editMode, setEditMode] = useState(false);
  
  // Datos de usuario por defecto
  userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const [formData, setFormData] = useState(userData);

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
            <Typography variant="body2">{userData.name}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body2">{userData.email}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Modificar
          </Button>
        </Box>
      )}
    </Box>
  );
};
