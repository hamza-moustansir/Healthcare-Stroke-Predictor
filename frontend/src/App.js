import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Cover from "./cover";
import axios from "axios";

const App = () => {
  const [state, setState] = useState({
    age: 40,
    hypertension: 0,
    heart_disease: 0,
    avg_glucose_level: 83.94,
    bmi: 28.89,
    ever_married: 0, // 0 = Non, 1 = Oui
    work_type: 0, // Valeur numérique encodée (0 = Private, 1 = Self-employed, etc.)
  });
  const [error, setError] = useState(null);

  // Mapping des options de work_type
  const workTypeOptions = [
    { label: "Private", value: 2 },
    { label: "Self-employed", value: 3 },
    { label: "Govt_job", value: 0 },
    { label: "children", value: 1 },
  ];

  const handlePredict = async () => {
    try {
      const payload = {
        age: state.age,
        hypertension: state.hypertension,
        heart_disease: state.heart_disease,
        avg_glucose_level: state.avg_glucose_level,
        bmi: state.bmi,
        ever_married: state.ever_married,
        work_type: state.work_type, // Utiliser la valeur numérique directement
      };

      const response = await axios.post(
        "http://localhost:5000/predict",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { stroke, recommendations } = response.data;

      Swal.fire({
        title: stroke ? "Risque élevé de stroke" : "Risque faible",
        html: `
          <div class="text-left">
            <h3 class="text-lg font-bold mb-2">Recommandations :</h3>
            <ul class="list-disc list-inside">
              ${recommendations.map((rec) => `<li>${rec}</li>`).join("")}
            </ul>
          </div>
        `,
        icon: stroke ? "warning" : "info",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-gray-800 text-white rounded-lg",
          confirmButton: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
        },
      });

    } catch (error) {
      console.error("Erreur lors de la prédiction :", error);
      setError("Erreur lors de la prédiction");

      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de la prédiction",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center text-white h-screen">
      <Cover />
      <h1 className="text-4xl font-bold mb-3 text-center">
        Healthcare Action Predictor
      </h1>
      <p className="text-sm md:text-lg font-normal md:font-medium mb-8 text-center">
        Entrez les informations du patient pour obtenir une recommandation.
      </p>

      <div className="space-y-4 w-full max-w-md">
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Âge :
          </label>
          <input
            type="number"
            value={state.age}
            onChange={(e) => setState({ ...state, age: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Hypertension (0 = Non, 1 = Oui) :
          </label>
          <input
            type="number"
            value={state.hypertension}
            onChange={(e) => setState({ ...state, hypertension: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Maladie cardiaque (0 = Non, 1 = Oui) :
          </label>
          <input
            type="number"
            value={state.heart_disease}
            onChange={(e) => setState({ ...state, heart_disease: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Niveau de glucose moyen :
          </label>
          <input
            type="number"
            value={state.avg_glucose_level}
            onChange={(e) => setState({ ...state, avg_glucose_level: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            IMC (Indice de Masse Corporelle) :
          </label>
          <input
            type="number"
            value={state.bmi}
            onChange={(e) => setState({ ...state, bmi: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Marié(e) (0 = Non, 1 = Oui) :
          </label>
          <input
            type="number"
            value={state.ever_married}
            onChange={(e) => setState({ ...state, ever_married: e.target.value })}
            className="w-full text-black px-2 py-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Type de travail :
          </label>
          <select
            value={state.work_type}
            onChange={(e) => setState({ ...state, work_type: parseInt(e.target.value) })}
            className="w-full text-black px-2 py-1 rounded border"
          >
            {workTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6 text-base"
      >
        Evaluer
      </motion.button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default App;