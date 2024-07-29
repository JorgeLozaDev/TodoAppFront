import { Box, Button, TextField, Typography } from "@mui/material";

export const ProfileForm = ({
  formData,
  handleSubmit,
  handleInputChange,
  handleCancelClick,
  errors,
}) => {
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
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            // fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
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
          <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
};
