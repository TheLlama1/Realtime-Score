import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyUser = (
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};
