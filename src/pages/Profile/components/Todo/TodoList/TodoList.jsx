import { Button, Paper, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import { general } from "../../../../../services/apiCalls";
import { handleAxiosError } from "../../../../../utils/axiosErrorHandler";
import { isTokenExpired } from "../../../../../utils/helpers";
import { logout } from "../../../../userSlice";

dayjs.extend(relativeTime);
dayjs.extend(isBetween);

const CustomNoRowsOverlay = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>No hay tareas disponibles</p>
    </div>
  );
};

// Columnas de la tabla
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "tareaTitulo", headerName: "Tarea", width: 130 },
  { field: "descripcion", headerName: "Descripción", width: 130 },
  { field: "duracion", headerName: "Duración", width: 150 },
  { field: "tiempoParaInicio", headerName: "Tiempo para inicio", width: 180 },
  {
    field: "estado",
    headerName: "Estado",
    width: 100,
  },
  {
    field: "prioridad",
    headerName: "Prioridad",
    width: 100,
  },
  {
    field: "editar",
    headerName: "Editar",
    width: 100,
    renderCell: (params) => (
      <IconButton
        color="primary"
        onClick={() => {
          // Navega a la página de edición con el ID de la fila seleccionada
          navigate(`/profile/todos/edit/${params.row.id}`);
        }}
      >
        <EditIcon />
      </IconButton>
    ),
  },
];

export const TodoList = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  // Función que actualiza el campo "tiempo para inicio"
  const actualizarTiempoParaInicio = (todos) => {
    const now = dayjs();
    const updatedTodos = todos.map((todo) => {
      const fechaInicio = dayjs(todo.fechaInicio);
      const fechaFin = dayjs(todo.fechaFin);

      // Ignorar tareas que ya están completas o que están en curso
      if (
        todo.tiempoParaInicio === "En curso" ||
        todo.tiempoParaInicio === "Tarea finalizada" ||
        todo.tiempoParaInicio === "Incompleto"
      ) {
        return todo;
      }

      let tiempoParaInicio;
      if (now.isBetween(fechaInicio, fechaFin)) {
        tiempoParaInicio = "En curso";
      } else if (now.isAfter(fechaFin) && todo.completado) {
        tiempoParaInicio = "Tarea finalizada";
      } else if (now.isAfter(fechaFin) && !todo.completado) {
        tiempoParaInicio = "Incompleto";
      } else {
        const diffToStartInMinutes = fechaInicio.diff(now, "minute");
        tiempoParaInicio = `Comienza en ${diffToStartInMinutes} minutos`;
        if (diffToStartInMinutes >= 60) {
          const diffToStartInHours = fechaInicio.diff(now, "hour");
          tiempoParaInicio = `Comienza en ${diffToStartInHours} horas`;
          if (diffToStartInHours >= 24) {
            const diffToStartInDays = fechaInicio.diff(now, "day");
            tiempoParaInicio = `Comienza en ${diffToStartInDays} días`;
            if (diffToStartInDays >= 30) {
              const diffToStartInMonths = fechaInicio.diff(now, "month");
              tiempoParaInicio = `Comienza en ${diffToStartInMonths} meses`;
              if (diffToStartInMonths >= 12) {
                const diffToStartInYears = fechaInicio.diff(now, "year");
                tiempoParaInicio = `Comienza en ${diffToStartInYears} años`;
              }
            }
          }
        }
      }

      return { ...todo, tiempoParaInicio };
    });

    setRows(updatedTodos);
  };

  // Función para eliminar las filas seleccionadas
  const eliminarTareasSeleccionadas = () => {
    const nuevasFilas = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(nuevasFilas);

    // Aquí harías la llamada al backend para eliminar las tareas seleccionadas
    // Puedes usar selectedRows para identificar qué tareas eliminar
    console.log("Tareas eliminadas: ", selectedRows);
  };

  useEffect(() => {
    if (isTokenExpired(userData)) {
      dispatch(logout()); // Despacha la acción de logout
      navigate("/"); // Navega a la página de inicio o login después del logout
    } else {
      // Llamada al backend para obtener los 'to-dos'
      general("get", "todos/listTodos", userData) // Ajusta la URL según tu backend
        .then((response) => {
          const todos = response.data.allTodos.map((todo, index) => {
            const fechaInicio = dayjs(todo.fechaInicio);
            const fechaFin = dayjs(todo.fechaFin);
            const now = dayjs();

            // Cálculo de duración
            const diffInMinutes = fechaFin.diff(fechaInicio, "minute");
            let duracion = `${diffInMinutes} minutos`;
            if (diffInMinutes >= 60) {
              const diffInHours = fechaFin.diff(fechaInicio, "hour");
              duracion = `${diffInHours} horas`;
              if (diffInHours >= 24) {
                const diffInDays = fechaFin.diff(fechaInicio, "day");
                duracion = `${diffInDays} días`;
                if (diffInDays >= 30) {
                  const diffInMonths = fechaFin.diff(fechaInicio, "month");
                  duracion = `${diffInMonths} meses`;
                  if (diffInMonths >= 12) {
                    const diffInYears = fechaFin.diff(fechaInicio, "year");
                    duracion = `${diffInYears} años`;
                  }
                }
              }
            }

            // Cálculo de tiempo para inicio
            let tiempoParaInicio;
            if (now.isBetween(fechaInicio, fechaFin)) {
              tiempoParaInicio = "En curso";
            } else if (now.isAfter(fechaFin) && todo.completado) {
              tiempoParaInicio = "Tarea finalizada";
            } else if (now.isAfter(fechaFin) && !todo.completado) {
              tiempoParaInicio = "Incompleto";
            } else {
              const diffToStartInMinutes = fechaInicio.diff(now, "minute");
              tiempoParaInicio = `Comienza en ${diffToStartInMinutes} minutos`;
              if (diffToStartInMinutes >= 60) {
                const diffToStartInHours = fechaInicio.diff(now, "hour");
                tiempoParaInicio = `Comienza en ${diffToStartInHours} horas`;
                if (diffToStartInHours >= 24) {
                  const diffToStartInDays = fechaInicio.diff(now, "day");
                  tiempoParaInicio = `Comienza en ${diffToStartInDays} días`;
                  if (diffToStartInDays >= 30) {
                    const diffToStartInMonths = fechaInicio.diff(now, "month");
                    tiempoParaInicio = `Comienza en ${diffToStartInMonths} meses`;
                    if (diffToStartInMonths >= 12) {
                      const diffToStartInYears = fechaInicio.diff(now, "year");
                      tiempoParaInicio = `Comienza en ${diffToStartInYears} años`;
                    }
                  }
                }
              }
            }

            return {
              id: index + 1,
              tareaTitulo: todo.tarea,
              descripcion: todo.descripcion,
              duracion,
              tiempoParaInicio,
              estado: todo.estado,
              prioridad: todo.prioridad,
            };
          });

          setRows(todos);
          setLoading(false);

          // Actualiza el campo "tiempo para inicio" cada minuto
          const interval = setInterval(() => {
            actualizarTiempoParaInicio(todos);
          }, 60000); // 60000 ms = 1 minuto

          // Limpiar el intervalo cuando el componente se desmonta
          return () => clearInterval(interval);
        })
        .catch((error) => {
          handleAxiosError(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/profile/todos/form");
        }}
      >
        Agregar Tarea
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={eliminarTareasSeleccionadas}
        disabled={selectedRows.length === 0}
        sx={{ marginLeft: "10px" }}
      >
        Eliminar seleccionadas
      </Button>
      <Paper sx={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          sx={{ border: 0 }}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </>
  );
};
