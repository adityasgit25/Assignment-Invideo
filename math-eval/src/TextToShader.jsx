import { useState } from "react";
import axios from "axios";

export default function TextToShader() {
  const [description, setDescription] = useState("");
  const [shaderCode, setShaderCode] = useState("");
  const [error, setError] = useState(null);

  const handleGenerateShader = async () => {
    try {
      setError(null);
      const response = await axios.post("http://localhost:4000/api/generate-shader", {
        text: description,
      });

      const shaderText = response.data.candidates[0].content.parts[0].text;
      setShaderCode(shaderText);
    } catch (err) {
      setError("Failed to generate shader");
      setShaderCode(err.response?.data?.shader || "Error in shader generation");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Text-to-Shader</h1>
      <textarea
        className="border p-2 w-96 h-24"
        placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Generate Shader
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <canvas id="shaderCanvas" className="border mt-4 w-96 h-96"></canvas>

      {shaderCode && (
        <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
          {shaderCode}
        </pre>
      )}
    </div>
  );
}
