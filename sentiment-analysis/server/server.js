const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const natural = require("natural");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize sentiment analyzer
const Analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");

app.post("/analyze", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required!" });
    }

    // Analyze sentiment (-5 to +5 scale)
    const score = Analyzer.getSentiment(text.split(" "));
    let label = "Neutral";

    if (score > 0) label = "Positive";
    else if (score < 0) label = "Negative";

    res.json({ label, score });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
