from flask import Flask, request, jsonify
import joblib
import numpy as np



app = Flask(__name__)
from flask_cors import CORS
CORS(app)  # Allow all origins

# Load the trained model & scaler
model = joblib.load("house_price_model.pkl")
scaler = joblib.load("scaler.pkl")
print("Scaler expects:", scaler.n_features_in_, "features")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from the request
        data = request.json

        # Convert data into a NumPy array
        features = np.array(data["features"]).reshape(1, -1)

        # Scale the input data (if used during training)
        features_scaled = scaler.transform(features)

        # Make prediction
        predicted_price = model.predict(features_scaled)[0]

        return jsonify({"predicted_price": round(predicted_price, 2)})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
