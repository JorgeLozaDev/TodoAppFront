import dayjs from 'dayjs';

// Función para calcular la duración
export const calcularDuracion = (fechaInicio, fechaFin) => {
  const diffInMinutes = fechaFin.diff(fechaInicio, 'minute');
  let duracion = `${diffInMinutes} minutos`;

  if (diffInMinutes >= 60) {
    const diffInHours = fechaFin.diff(fechaInicio, 'hour');
    duracion = `${diffInHours} horas`;

    if (diffInHours >= 24) {
      const diffInDays = fechaFin.diff(fechaInicio, 'day');
      duracion = `${diffInDays} días`;

      if (diffInDays >= 30) {
        const diffInMonths = fechaFin.diff(fechaInicio, 'month');
        duracion = `${diffInMonths} meses`;

        if (diffInMonths >= 12) {
          const diffInYears = fechaFin.diff(fechaInicio, 'year');
          duracion = `${diffInYears} años`;
        }
      }
    }
  }

  return duracion;
};

// Función que actualiza el campo "tiempo para inicio"
export const actualizarTiempoParaInicio = (todos) => {
  const now = dayjs();
  return todos.map((todo) => {
    const fechaInicio = dayjs(todo.fechaInicio);
    const fechaFin = dayjs(todo.fechaFin);

    let tiempoParaInicio;
    if (now.isBetween(fechaInicio, fechaFin)) {
      tiempoParaInicio = 'En curso';
    } else if (now.isAfter(fechaFin) && todo.completado) {
      tiempoParaInicio = 'Tarea finalizada';
    } else if (now.isAfter(fechaFin) && !todo.completado) {
      tiempoParaInicio = 'Incompleto';
    } else {
      const diffToStartInMinutes = fechaInicio.diff(now, 'minute');
      tiempoParaInicio = `Comienza en ${diffToStartInMinutes} minutos`;

      if (diffToStartInMinutes >= 60) {
        const diffToStartInHours = fechaInicio.diff(now, 'hour');
        tiempoParaInicio = `Comienza en ${diffToStartInHours} horas`;

        if (diffToStartInHours >= 24) {
          const diffToStartInDays = fechaInicio.diff(now, 'day');
          tiempoParaInicio = `Comienza en ${diffToStartInDays} días`;

          if (diffToStartInDays >= 30) {
            const diffToStartInMonths = fechaInicio.diff(now, 'month');
            tiempoParaInicio = `Comienza en ${diffToStartInMonths} meses`;

            if (diffToStartInMonths >= 12) {
              const diffToStartInYears = fechaInicio.diff(now, 'year');
              tiempoParaInicio = `Comienza en ${diffToStartInYears} años`;
            }
          }
        }
      }
    }

    return { ...todo, tiempoParaInicio };
  });
};
