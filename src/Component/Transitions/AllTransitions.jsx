import "animate.css";
import { cssTransition } from "react-toastify";

export const fadeIn = cssTransition({
  enter: "animate__animated animate__fadeIn",
  exit: "animate__animated animate__fadeOut",
});
