import  { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) return alert("Enter some text!");

    try {
      const response = await axios.post("http://localhost:5000/analyze", { text });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing sentiment", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Sentiment Analysis</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={analyzeSentiment} style={{ marginTop: "10px" }}>
        Analyze Sentiment
      </button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p><strong>Sentiment:</strong> {result.label}</p>
          <p><strong>Score:</strong> {result.score}</p>
        </div>
      )}
    </div>
  );
}

export default App;
