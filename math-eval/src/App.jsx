import { Routes, Route } from "react-router-dom";
import Calculator from "./Calculator"; 
import TexttoShader from "./TextToShader"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/text-to-shader" element={<TexttoShader />} />
    </Routes>
  );
}
