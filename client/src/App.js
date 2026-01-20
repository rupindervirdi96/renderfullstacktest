import { useState } from "react";

function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setResponse(`${data.message} (${data.time})`);
    } catch (err) {
      setResponse("API call failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>React → Express Demo</h1>

      <button
        onClick={callApi}
        disabled={loading}
        style={{
          padding: "10px 16px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? "Calling API..." : "Call Server API"}
      </button>

      {response && (
        <p style={{ marginTop: 20, fontSize: 18 }}>
          <strong>Response:</strong> {response}
        </p>
      )}
    </div>
  );
}

export default App;
