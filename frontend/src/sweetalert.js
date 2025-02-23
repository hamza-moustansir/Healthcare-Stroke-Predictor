import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const SweetAlert = ({ sentiment }) => {
  useEffect(() => {
    if (sentiment) {
      Swal.fire({
        icon: sentiment === "positive" ? "success" : "error",
        title: sentiment === "positive" ? "Sentiment Positif" : "Sentiment Négatif",
        text: `Le sentiment détecté est : ${sentiment}`,
        customClass: {
          popup: "dark-mode",
          header: "dark-mode",
          content: "dark-mode",
          footer: "dark-mode",
        },
        showConfirmButton: false,
      });
    }
  }, [sentiment]);

  return null;
};

export default SweetAlert;
