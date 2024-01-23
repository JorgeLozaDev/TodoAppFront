import { toast, ToastContainer as BaseToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente para mostrar tostadas
const Toasty = ({ message, type = "default", options }) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const showToast = () => {
    switch (type) {
      case "info":
        toast.info(message, toastOptions);
        break;
      case "success":
        toast.success(message, toastOptions);
        break;
      case "warn":
        toast.warn(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
        break;
    }
  };

  showToast(); // Llamar al método de mostrar tostadas

  return null; // Toasty component doesn't render anything in the DOM
};

// Componente de contenedor de tostadas
const ToastContainer = () => {
  return (
    <BaseToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export { Toasty, ToastContainer };
