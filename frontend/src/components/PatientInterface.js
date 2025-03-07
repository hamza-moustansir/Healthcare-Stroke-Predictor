import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUser, FaHeartbeat, FaSyringe, FaWeight, FaVenusMars, FaBriefcase, FaRing } from "react-icons/fa";

const PatientInterface = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: 40,
    hypertension: 0,
    heart_disease: 0,
    avg_glucose_level: 83.94,
    bmi: 28.89,
    ever_married: 0,
    work_type: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        age: parseFloat(formData.age),
        hypertension: parseInt(formData.hypertension),
        heart_disease: parseInt(formData.heart_disease),
        avg_glucose_level: parseFloat(formData.avg_glucose_level),
        bmi: parseFloat(formData.bmi),
        ever_married: parseInt(formData.ever_married),
        work_type: parseInt(formData.work_type),
      };

      const response = await axios.post("http://localhost:5000/predict", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: response.data.stroke ? "Risque élevé d'AVC" : "Risque faible",
        html: `
          <div class="text-left">
            <h3 class="text-lg font-bold mb-2">Recommandations :</h3>
            <ul class="list-disc list-inside">
              ${response.data.recommendations.map(rec => `<li>${rec}</li>`).join("")}
            </ul>
          </div>
        `,
        icon: response.data.stroke ? "warning" : "info",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-white text-blue-900 rounded-lg",
          confirmButton: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      Swal.fire("Erreur", "Une erreur est survenue lors de la prédiction", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Healthcare Action Predictor
          </span>
        </h1>
        <p className="text-sm md:text-lg text-blue-700 mb-8 text-center">
          Entrez les informations du patient pour obtenir une recommandation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaUser className="mr-2" /> Nom
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le nom"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaUser className="mr-2" /> Prénom
              </label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le prénom"
              />
            </div>
          </div>

          {/* Âge */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-900 font-medium flex items-center">
              <FaHeartbeat className="mr-2" /> Âge
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez l'âge"
            />
          </div>

          {/* Hypertension et Maladie cardiaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaSyringe className="mr-2" /> Hypertension (0/1)
              </label>
              <input
                type="number"
                value={formData.hypertension}
                onChange={(e) => setFormData({ ...formData, hypertension: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0 ou 1"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaHeartbeat className="mr-2" /> Maladie cardiaque (0/1)
              </label>
              <input
                type="number"
                value={formData.heart_disease}
                onChange={(e) => setFormData({ ...formData, heart_disease: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0 ou 1"
              />
            </div>
          </div>

          {/* Glucose et IMC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaSyringe className="mr-2" /> Glucose moyen
              </label>
              <input
                type="number"
                value={formData.avg_glucose_level}
                onChange={(e) => setFormData({ ...formData, avg_glucose_level: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le glucose"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaWeight className="mr-2" /> IMC
              </label>
              <input
                type="number"
                value={formData.bmi}
                onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez l'IMC"
              />
            </div>
          </div>

          {/* Marié(e) et Type de travail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaRing className="mr-2" /> Marié(e) (0/1)
              </label>
              <input
                type="number"
                value={formData.ever_married}
                onChange={(e) => setFormData({ ...formData, ever_married: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0 ou 1"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-blue-900 font-medium flex items-center">
                <FaBriefcase className="mr-2" /> Type de travail
              </label>
              <input
                type="number"
                value={formData.work_type}
                onChange={(e) => setFormData({ ...formData, work_type: e.target.value })}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le type de travail"
              />
            </div>
          </div>

          {/* Bouton d'évaluation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg mt-6 hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            Évaluer le risque
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientInterface;