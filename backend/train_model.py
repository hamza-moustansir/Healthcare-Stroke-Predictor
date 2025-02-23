from models.q_learning_model import QLearningModel

# Entraîner le modèle
model = QLearningModel("data/healthcare-dataset.csv")
model.train(num_episodes=1000)  # Ajuster le nombre d'épisodes

# Sauvegarder le modèle
model.save_model("q_learning_model.pkl")

print("Modèle entraîné et sauvegardé avec succès !")