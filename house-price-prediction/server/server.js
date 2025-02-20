const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend to access
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.post("/get-house-price", async (req, res) => {
    try {
        // Send data to Flask API
        const response = await axios.post("http://127.0.0.1:5000/predict", {
            features: req.body.features,  // Array of features
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Prediction failed" });
    }
});

app.listen(3000, () => console.log("Node.js server running on port 3000"));
