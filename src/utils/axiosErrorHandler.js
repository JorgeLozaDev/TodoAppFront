import { Toasty } from "../common/CustomToasty/CustomToasty";


export const handleAxiosError = (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      Toasty({
        message: `Error: ${error.response.status} - ${error.response.data.message}`,
        type: "error",
      });
    } else if (error.request) {
      // La solicitud fue hecha, pero no se recibió una respuesta
      Toasty({
        message: "No se recibió respuesta del servidor",
        type: "error",
      });
    } else {
      // Algo sucedió al configurar la solicitud que desencadenó un error
      Toasty({
        message: "Error al configurar la solicitud",
        type: "error",
      });
    }
  };
  