import React from "react";

const Recommendations = ({ recommendations }) => {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Recommandations</h2>
      <ul className="list-disc list-inside space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="text-sm md:text-base">
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;