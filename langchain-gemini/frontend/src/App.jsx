import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message) return;
    try {
      const res = await axios.post("http://localhost:5003/chat", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Chat with Langchain & Gemini</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <h2>Response:</h2>
      <p>{response}</p>
    </div>
  );
}

export default App;
