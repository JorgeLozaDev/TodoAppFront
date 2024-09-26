import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../../../../utils/helpers";
import { logout, userDetails } from "../../../../userSlice";
import { FormTodo } from "./components/FormTodo";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/es";

dayjs.extend(updateLocale);

dayjs.updateLocale("es", {
  weekStart: 1,
});

export const TodoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(userDetails);
  const [tiempo, setTiempo] = useState(dayjs().add(10, "minute"));
  const [tiempoFin, settiempoFin] = useState(dayjs().add(15, "minute"));
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [formValues, setFormValues] = useState({
    tituloTarea: "",
    descripcion: "",
  });
  const [errors, setErrors] = useState({
    tituloTarea: "",
    descripcion: "",
    tiempo: "",
    tiempoFin: "",
    estado: "",
    prioridad: "",
  });

  useEffect(() => {
    if (isTokenExpired(token.credentials)) {
      dispatch(logout());
      navigate("/");
    }
  }, [token, dispatch, navigate]);

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
    if (!event.target.value) {
      setErrors((prev) => ({ ...prev, estado: "El estado es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, estado: "" }));
    }
  };

  const handlePrioridadChange = (event) => {
    setPrioridad(event.target.value);
    if (!event.target.value) {
      setErrors((prev) => ({
        ...prev,
        prioridad: "La prioridad es obligatoria",
      }));
    } else {
      setErrors((prev) => ({ ...prev, prioridad: "" }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "tituloTarea" && !value) {
      setErrors((prev) => ({
        ...prev,
        tituloTarea: "El título es obligatorio",
      }));
    } else if (name === "tituloTarea") {
      setErrors((prev) => ({ ...prev, tituloTarea: "" }));
    }

    if (name === "descripcion" && value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        descripcion: "La descripción debe tener al menos 10 caracteres",
      }));
    } else if (name === "descripcion") {
      setErrors((prev) => ({ ...prev, descripcion: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;

    // Validaciones al enviar el formulario
    if (!formValues.tituloTarea) {
      setErrors((prev) => ({
        ...prev,
        tituloTarea: "El título es obligatorio",
      }));
      formIsValid = false;
    }

    if (formValues.descripcion.length < 10) {
      setErrors((prev) => ({
        ...prev,
        descripcion: "La descripción debe tener al menos 10 caracteres",
      }));
      formIsValid = false;
    }

    if (!estado) {
      setErrors((prev) => ({ ...prev, estado: "El estado es obligatorio" }));
      formIsValid = false;
    }

    if (!prioridad) {
      setErrors((prev) => ({
        ...prev,
        prioridad: "La prioridad es obligatoria",
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      // Aquí enviaríamos el formulario si todas las validaciones pasan
      console.log("Formulario enviado:", {
        formValues,
        estado,
        prioridad,
        tiempo,
        tiempoFin,
      });
    }
  };

  const handleCancelClick = () => {
    // Lógica para manejar el click de "Cancelar"
  };

  return (
    <FormTodo
      tiempo={tiempo}
      setTiempo={setTiempo}
      tiempoFin={tiempoFin}
      settiempoFin={settiempoFin}
      estado={estado}
      handleEstadoChange={handleEstadoChange}
      prioridad={prioridad}
      handlePrioridadChange={handlePrioridadChange}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleCancelClick={handleCancelClick}
      formValues={formValues}
      errors={errors}
    />
  );
};
