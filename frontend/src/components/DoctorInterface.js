import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorInterface = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Interface Médecin
      </h1>

      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Prénom</th>
              <th className="p-3">Âge</th>
              <th className="p-3">Hypertension</th>
              <th className="p-3">Cardiopathie</th>
              <th className="p-3">Glucose</th>
              <th className="p-3">IMC</th>
              <th className="p-3">Risque AVC</th>
              <th className="p-3">Recommandations</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="p-3 text-center text-blue-900">{patient.nom}</td>
                <td className="p-3 text-center text-blue-900">{patient.prenom}</td>
                <td className="p-3 text-center text-blue-900">{patient.age}</td>
                <td className="p-3 text-center text-blue-900">{patient.hypertension ? "Oui" : "Non"}</td>
                <td className="p-3 text-center text-blue-900">{patient.heart_disease ? "Oui" : "Non"}</td>
                <td className="p-3 text-center text-blue-900">{patient.avg_glucose_level}</td>
                <td className="p-3 text-center text-blue-900">{patient.bmi}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded ${patient.prediction.stroke ? "bg-red-500" : "bg-green-500"} text-white`}>
                    {patient.prediction.stroke ? "Élevé" : "Faible"}
                  </span>
                </td>
                <td className="p-3">
                  <ul className="list-disc pl-4 text-blue-900">
                    {patient.prediction.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorInterface;