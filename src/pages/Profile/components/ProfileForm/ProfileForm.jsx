import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const ProfileForm = ({
  formData,
  setFormData,
  handleSave,
  handleCancel,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

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

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSave(formData);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Box sx={{ mb: 2, width: 600, maxWidth: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            // fullWidth
            id="name"
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
            // InputProps={{ sx: { width: '100%' } }}
          />
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", height: "20px" }}
          >
            {errors.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            // fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            FormHelperTextProps={{ style: { margin: 0, height: "20px" } }}
          />
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", height: "20px" }}
          >
            {errors.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
};
