import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PatientInterface from "./components/PatientInterface";
import DoctorInterface from "./components/DoctorInterface";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-center space-x-6">
            <Link
              to="/patient"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Interface Patient
            </Link>
            <Link
              to="/doctor"
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Interface Médecin
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/patient" element={<PatientInterface />} />
          <Route path="/doctor" element={<DoctorInterface />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;