import { useState } from "react";
import axios from "axios";
import "./HousePricePrediction.css"; // Import the CSS file

function HousePricePrediction() {
    const [features, setFeatures] = useState({
        area: "",
        latitude: "",
        longitude: "",
        bedrooms: "",
        bathrooms: "",
        status: "",
        newOrOld: "",
        priceSqft: "",
        typeOfBuilding: ""
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFeatures({
            ...features,
            [e.target.name]: e.target.value
        });
    };

    const getPrediction = async () => {
        try {
            const response = await axios.post("http://localhost:3000/get-house-price", {
                features: Object.values(features).map(Number)  // Convert to an array of numbers
            });

            setPrediction(response.data.predicted_price);
        } catch (error) {
            console.error("Error predicting house price", error);
        }
    };

    return (
        <div className="container">
            <h2>Delhi House Price Prediction</h2>
            <div className="form-group">
                <label>Area (sq ft)</label>
                <input type="number" name="area" value={features.area} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Latitude</label>
                <input type="number" name="latitude" value={features.latitude} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Longitude</label>
                <input type="number" name="longitude" value={features.longitude} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Bedrooms</label>
                <input type="number" name="bedrooms" value={features.bedrooms} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Bathrooms</label>
                <input type="number" name="bathrooms" value={features.bathrooms} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Status (1 = Ready, 0 = Under Construction)</label>
                <input type="number" name="status" value={features.status} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>New or Old (1 = New, 0 = Old)</label>
                <input type="number" name="newOrOld" value={features.newOrOld} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price per sqft</label>
                <input type="number" name="priceSqft" value={features.priceSqft} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Type of Building (1 = Individual House, 0 = Other)</label>
                <input type="number" name="typeOfBuilding" value={features.typeOfBuilding} onChange={handleChange} />
            </div>

            <button className="predict-btn" onClick={getPrediction}>Predict</button>
            
            {prediction && <p className="prediction-text">Predicted Price: ₹{prediction}</p>}
        </div>
    );
}

export default HousePricePrediction;
