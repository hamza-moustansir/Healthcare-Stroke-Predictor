from flask import Flask, request, jsonify
from flask_cors import CORS
from models.q_learning_model import QLearningModel
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Stockage des patients (en mémoire)
patients = []
model = QLearningModel("data/healthcare-dataset.csv")
model.train(episodes=10)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        patient_data = (
            float(data["age"]),
            int(data["hypertension"]),
            int(data["heart_disease"]),
            float(data["avg_glucose_level"]),
            float(data["bmi"]),
            int(data["ever_married"]),
            int(data["work_type"])
        )
        result = model.predict_and_recommend(patient_data)
        
        # Ajouter le patient à l'historique avec nom et prenom
        patients.append({
            **data,
            "prediction": result,
            "timestamp": datetime.now().isoformat()
        })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/patients", methods=["GET"])
def get_patients():
    return jsonify(patients)

if __name__ == "__main__":
    app.run(debug=True)