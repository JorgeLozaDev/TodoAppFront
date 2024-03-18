import { Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignInForm = ({formData, handleSubmit, handleInputChange, errors}) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleInputChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link to="/register" variant="body2">
            {"¿No tienes cuenta? Registrate"}
          </Link>
          
        </Grid>
      </Grid>
    </>
  );
};
export default SignInForm;
