import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  autoClose: 2000,
  position: toast.POSITION.TOP_CENTER,
};

export const Notify = {
  success: (message = "Saved successfully") => {
    toast.success(message, options);
  },
  error: () => {
    toast.error("Failed. Please try again", options);
  },
};
