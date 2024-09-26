import { Textarea } from "@mui/joy";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export const FormTodo = ({
  tiempo,
  setTiempo,
  tiempoFin,
  settiempoFin,
  estado,
  handleEstadoChange,
  prioridad,
  handlePrioridadChange,
  handleInputChange,
  handleSubmit,
  handleCancelClick,
  formValues,
  errors,
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="tituloTarea"
            label="Título de la tarea"
            name="tituloTarea"
            onChange={handleInputChange}
            error={!!errors.tituloTarea}
            helperText={errors.tituloTarea}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Textarea
            color="neutral"
            minRows={3}
            placeholder="Descripción de la tarea"
            size="lg"
            variant="outlined"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleInputChange}
            error={!!errors.descripcion}
          />
          {errors.descripcion && (
            <Typography color="error" variant="body2">
              {errors.descripcion}
            </Typography>  // Mostramos el mensaje de error debajo del textarea
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <MobileDateTimePicker
              sx={{ flex: 1 }}
              label="Fecha inicio"
              disablePast={true}
              value={tiempo}
              onChange={setTiempo}
            />

            <MobileDateTimePicker
              label="Fecha fin"
              disablePast={true}
              value={tiempoFin}
              onChange={settiempoFin}
              sx={{ flex: 1 }}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl fullWidth error={!!errors.estado}>
            <InputLabel id="estado-select-label">Estado</InputLabel>
            <Select
              labelId="estado-select-label"
              id="estado-select"
              value={estado}
              label="Estado"
              onChange={handleEstadoChange}
            >
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="en progreso">En Progreso</MenuItem>
              <MenuItem value="caducado">Caducado</MenuItem>
              <MenuItem value="completado">Completado</MenuItem>
            </Select>
            {errors.estado && <p style={{ color: "red" }}>{errors.estado}</p>}
          </FormControl>

          <FormControl fullWidth error={!!errors.prioridad}>
            <InputLabel id="prioridad-select-label">Prioridad</InputLabel>
            <Select
              labelId="prioridad-select-label"
              id="prioridad-select"
              value={prioridad}
              label="Prioridad"
              onChange={handlePrioridadChange}
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
              <MenuItem value="urgente">Urgente</MenuItem>
            </Select>
            {errors.prioridad && (
              <p style={{ color: "red" }}>{errors.prioridad}</p>
            )}
          </FormControl>
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
  );
};
