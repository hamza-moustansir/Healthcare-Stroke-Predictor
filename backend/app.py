from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer Flask-CORS
from models.q_learning_model import QLearningModel

app = Flask(__name__)
CORS(app)
# Initialisation du modèle
model = QLearningModel("data/healthcare-dataset.csv")
model.train(episodes=10)  # Entraînement du modèle

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        patient_data = (
            float(data["age"]),
            int(data["hypertension"]),
            int(data["heart_disease"]),
            float(data["avg_glucose_level"]),
            float(data["bmi"])
        )
        result = model.predict_and_recommend(patient_data)  # ✅ Correction appliquée
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
