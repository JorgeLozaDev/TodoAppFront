import { Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = ({
  formData,
  handleSubmit,
  handleInputChange,
  errors,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="username"
            required
            fullWidth
            id="username"
            label="User Name"
            autoFocus
            value={formData.username}
            onChange={handleInputChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/signin" variant="body2">
              {"¿Ya tienes  cuenta? Inicia sesión"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterForm;
