import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const DoctorDashboard = ({ patients }) => {
  const riskData = [
    { name: "Risque élevé", value: patients.filter(p => p.prediction.stroke).length },
    { name: "Risque faible", value: patients.filter(p => !p.prediction.stroke).length },
  ];

  const ageData = patients.reduce((acc, patient) => {
    const ageGroup = Math.floor(patient.age / 10) * 10;
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const ageChartData = Object.keys(ageData).map(key => ({
    ageGroup: `${key}-${parseInt(key) + 9}`,
    patients: ageData[key],
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Tableau de bord</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graphique en camembert pour le risque */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Répartition des risques</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={riskData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#EF4444" : "#3B82F6"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Graphique en barres pour l'âge */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Répartition par âge</h3>
          <BarChart width={400} height={300} data={ageChartData}>
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#3B82F6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;