import axios from "axios";

const baseURL = "http://localhost:3000/";

export const general = async (verbo, endpoint, header, data) => {
  // Validaciones para asegurar que se proporcionen el verbo y el endpoint
  if (!verbo || !endpoint) {
    console.error("Se deben proporcionar el verbo y el endpoint.");
    throw new Error("Falta el verbo o el endpoint en la llamada a la API.");
  }

  try {
    const axiosConfig = {
      method: verbo,
      url: `${baseURL}${endpoint}`,
    };

    // Agregar headers si se proporcionan
    if (header) {
      axiosConfig.headers = { Authorization: `Bearer ${header}` };
    }

    // Agregar datos si se proporcionan
    if (data) {
      axiosConfig.data = data;
    }

    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    // Manejo de errores (puedes personalizar según tus necesidades)
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};
