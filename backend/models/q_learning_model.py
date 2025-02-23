import pandas as pd
import random

class QLearningModel:
    def __init__(self, data_path, alpha=0.1, gamma=0.9, epsilon=0.5):
        # Charger le dataset
        self.df = pd.read_csv(data_path)

        # Sélection des colonnes pertinentes
        self.df = self.df[["age", "hypertension", "heart_disease", "avg_glucose_level", "bmi", "stroke"]]

        # Remplacer les valeurs NaN dans 'bmi' par la moyenne
        self.df["bmi"] = self.df["bmi"].fillna(self.df["bmi"].mean())

        # Paramètres d'apprentissage
        self.alpha = alpha
        self.gamma = gamma
        self.epsilon = epsilon

        # Définition des états et actions
        self.states = self.df["stroke"].tolist()
        self.actions = self.df.apply(
            lambda row: (int(row.age), int(row.hypertension), int(row.heart_disease),
                         row.avg_glucose_level, row.bmi), axis=1).tolist()
        
        # Initialisation de la table Q
        self.table_Q = {state: {action: 0 for action in self.actions} for state in self.states}

    def get_reward(self, state, action):
        stroke = state
        age, hypertension, heart_disease, glucose, bmi = action

        if stroke == 1:
            if hypertension == 1 or heart_disease == 1 or age > 65:
                return 20  # Cas critique
            elif glucose > 180 or bmi > 30:
                return 15  # À surveiller
            else:
                return 10  # Modéré
        else:
            if age < 40 and hypertension == 0 and heart_disease == 0:
                return 10  # Faible risque
            elif hypertension == 1 or heart_disease == 1:
                return -5  # À surveiller
            elif glucose > 200 or bmi > 30:
                return -10  # Alerte santé
            else:
                return 5

    def train(self, episodes=100):
        for _ in range(episodes):
            for state in self.states:
                if random.uniform(0, 1) < self.epsilon:
                    action = random.choice(self.actions)  # Exploration
                else:
                    action = max(self.table_Q[state], key=self.table_Q[state].get)

                reward = self.get_reward(state, action)
                next_state = state  # Environnement statique
                max_future_q = max(self.table_Q[next_state].values(), default=0)

                self.table_Q[state][action] += self.alpha * (reward + self.gamma * max_future_q - self.table_Q[state][action])

    def predict_and_recommend(self, patient_data):
     age, hypertension, heart_disease, glucose, bmi = patient_data

     # Prédire si le patient est à risque
     risk_score = 0
     if age > 65: risk_score += 2
     if hypertension == 1: risk_score += 2
     if heart_disease == 1: risk_score += 2
     if glucose > 180: risk_score += 1
     if bmi > 30: risk_score += 1

     has_stroke = 1 if risk_score >= 5 else 0
 
     # Vérifier si la table Q contient des recommandations pour cet état
     if has_stroke in self.table_Q:
         best_action = max(self.table_Q[has_stroke], key=self.table_Q[has_stroke].get)
     else:
         best_action = "Pas de données suffisantes pour recommander"

    # ✅ Recommandations en fonction du risque d'AVC
     if has_stroke:
         recommendations = [
            "Suivi médical régulier",
            "Adopter un régime alimentaire sain",
            "Activité physique adaptée",
            "Surveillance du taux de glucose et du BMI"
        ]
     else:
         recommendations = [
            "Maintenir un mode de vie sain",
            "Contrôler régulièrement les paramètres vitaux"
        ]

     return {"stroke": has_stroke,  "recommendations": recommendations}

