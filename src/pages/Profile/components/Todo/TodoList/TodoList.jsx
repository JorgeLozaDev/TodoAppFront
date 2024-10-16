import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { general } from "../../../../../services/apiCalls";
import { handleAxiosError } from "../../../../../utils/axiosErrorHandler";
import { isTokenExpired } from "../../../../../utils/helpers";
import { logout } from "../../../../userSlice";
import {
  calcularDuracion,
  actualizarTiempoParaInicio,
} from "../../../../../utils/timeCalculations"; 
import  "./Todolist.css";

const CustomNoRowsOverlay = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>No hay tareas disponibles</p>
    </div>
  );
};

const columns = [
  { field: "_id", headerName: "ID",  cellClassName: 'hiddenColumn',headerClassName: 'hiddenHeader' },
  { field: "tareaTitulo", headerName: "Tarea", width: 130 },
  { field: "descripcion", headerName: "Descripción", width: 130 },
  { field: "duracion", headerName: "Duración", width: 150 },
  { field: "tiempoParaInicio", headerName: "Tiempo para inicio", width: 180 },
  { field: "estado", headerName: "Estado", width: 100 },
  { field: "prioridad", headerName: "Prioridad", width: 100 },
];

export const TodoList = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]); // Este es el estado de las filas seleccionadas

  // Función para eliminar tareas seleccionadas
  const eliminarTareasSeleccionadas = () => {
    if (selectedRows.length === 0) return;

    const idsToDelete = selectedRows.map((rowId) => {
      const row = rows.find((r) => r.id === rowId);
      return row._id; // Usamos el _id de MongoDB para la eliminación
    });

    general("delete", "todos/deleteTodos", userData, { ids: idsToDelete })
      .then(() => {
        const nuevasFilas = rows.filter(
          (row) => !selectedRows.includes(row.id)
        );
        setRows(nuevasFilas);
        setSelectedRows([]); // Limpiar las filas seleccionadas después de eliminarlas
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  };

  const editarTareaSeleccionada = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0]; // Obtener el ID de la tarea seleccionada
      // navigate(`/profile/todos/form/${selectedRowId}`); // Redirigir al formulario con el ID para edición
      console.log(selectedRows);
    }
  };

  useEffect(() => {
    if (isTokenExpired(userData)) {
      dispatch(logout());
      navigate("/");
    } else {
      general("get", "todos/listTodos", userData)
        .then((response) => {
          const todos = response.data.allTodos.map((todo, index) => {
            const fechaInicio = dayjs(todo.fechaInicio);
            const fechaFin = dayjs(todo.fechaFin);

            const duracion = calcularDuracion(fechaInicio, fechaFin);
            return {
              id: index + 1,
              _id: todo._id, // Este es el ID de MongoDB
              tareaTitulo: todo.tarea,
              descripcion: todo.descripcion,
              duracion,
              estado: todo.estado,
              prioridad: todo.prioridad,
              fechaInicio: todo.fechaInicio,
              fechaFin: todo.fechaFin,
              completado: todo.completado,
            };
          });

          const todosConTiempoParaInicio = actualizarTiempoParaInicio(todos);
          setRows(todosConTiempoParaInicio);
          setLoading(false);
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
        onClick={() => navigate("/profile/todos/form")}
      >
        Agregar tarea
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={eliminarTareasSeleccionadas}
        disabled={selectedRows.length === 0} // El botón se deshabilita si no hay filas seleccionadas
        sx={{ marginLeft: "10px" }}
      >
        Eliminar seleccionadas
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={editarTareaSeleccionada}
        disabled={selectedRows.length !== 1} // Solo se habilita si hay una fila seleccionada
        sx={{ marginLeft: "10px" }}
      >
        Editar seleccionada
      </Button>
      <Paper sx={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          checkboxSelection // Asegúrate de tener esto para habilitar la selección de múltiples filas
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          selectionModel={selectedRows}
          sx={{ border: 0 }}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>
    </>
  );
};
