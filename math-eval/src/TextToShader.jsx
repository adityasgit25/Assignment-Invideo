// import { useState } from "react";
// import axios from "axios";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState("");
//   const [error, setError] = useState(null);

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });

//       const shaderText = response.data.candidates[0].content.parts[0].text;
//       setShaderCode(shaderText);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode(err.response?.data?.shader || "Error in shader generation");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       <canvas id="shaderCanvas" className="border mt-4 w-96 h-96"></canvas>

//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   let gl;

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });
      
//       const shaderText = response.data.candidates[0].content.parts[0].text;
//       setShaderCode(shaderText);
      
//       requestAnimationFrame(renderShader);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode("Error in shader generation");
//     }
//   };

//   const compileShader = (source, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//       return null;
//     }
//     return shader;
//   };

//   const renderShader = () => {
//     if (!shaderCode || !canvasRef.current) return;

//     gl = canvasRef.current.getContext("webgl2");
//     if (!gl) {
//       setError("WebGL2 is not supported in your browser");
//       return;
//     }
    
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     const vertexShaderSource = `#version 300 es
//       layout(location = 0) in vec3 aPos;
//       uniform mat4 model;
//       uniform mat4 view;
//       uniform mat4 projection;
//       void main() {
//         gl_Position = projection * view * model * vec4(aPos, 1.0);
//       }`;
    
//     const fragmentShaderSource = `#version 300 es
//       precision highp float;
//       out vec4 FragColor;
//       void main() {
//         vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
//         FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
//       }`;

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
//     if (!vertexShader || !fragmentShader) {
//       setError("Shader compilation failed");
//       return;
//     }
    
//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
    
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//       console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
//       setError("Shader linking failed");
//       return;
//     }
    
//     gl.useProgram(shaderProgram);
//   };

//   useEffect(() => {
//     renderShader();
//   }, [shaderCode]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   let gl;

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });
      
//       const shaderText = response.data.candidates[0].content.parts[0].text;
//       setShaderCode(shaderText);
      
//       requestAnimationFrame(renderShader);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode("Error in shader generation");
//     }
//   };

//   const compileShader = (source, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//       return null;
//     }
//     return shader;
//   };

//   const renderShader = () => {
//     if (!shaderCode || !canvasRef.current) return;

//     gl = canvasRef.current.getContext("webgl2");
//     if (!gl) {
//       setError("WebGL2 is not supported in your browser");
//       return;
//     }
    
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     const vertexShaderSource = `#version 300 es
//       precision highp float;
//       layout(location = 0) in vec2 aPos;
//       out vec2 uv;
//       void main() {
//         uv = (aPos + 1.0) / 2.0;
//         gl_Position = vec4(aPos, 0.0, 1.0);
//       }`;
    
//     const fragmentShaderSource = shaderCode;

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
//     if (!vertexShader || !fragmentShader) {
//       setError("Shader compilation failed");
//       return;
//     }
    
//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
    
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//       console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
//       setError("Shader linking failed");
//       return;
//     }
    
//     gl.useProgram(shaderProgram);

//     const vertices = new Float32Array([
//       -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
//       -1.0,  1.0,  1.0, -1.0,  1.0,  1.0
//     ]);
    
//     const vao = gl.createVertexArray();
//     gl.bindVertexArray(vao);

//     const vbo = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const positionAttrib = gl.getAttribLocation(shaderProgram, "aPos");
//     gl.enableVertexAttribArray(positionAttrib);
//     gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
    
//     gl.drawArrays(gl.TRIANGLES, 0, 6);
//   };

//   useEffect(() => {
//     renderShader();
//   }, [shaderCode]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   let gl;

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });

//       let shaderText = response.data.candidates[0].content.parts[0].text;
      
//       // Extract only GLSL code (remove extra text if present)
//       shaderText = shaderText.match(/```glsl([\s\S]*?)```/);
//       if (!shaderText) {
//         setError("Invalid shader code received");
//         return;
//       }
      
//       shaderText = shaderText[1].trim(); // Extract only shader code
//       setShaderCode(shaderText);
//       requestAnimationFrame(renderShader);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode("Error in shader generation");
//     }
//   };

//   const compileShader = (source, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       const errorMessage = gl.getShaderInfoLog(shader);
//       console.error(`Shader compile error: ${errorMessage}`);
//       setError(errorMessage);
//       return null;
//     }
//     return shader;
//   };

//   const renderShader = () => {
//     if (!shaderCode || !canvasRef.current) return;

//     gl = canvasRef.current.getContext("webgl2");
//     if (!gl) {
//       setError("WebGL2 is not supported in your browser");
//       return;
//     }

//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     const vertexShaderSource = `#version 300 es
//       precision highp float;
//       layout(location = 0) in vec2 aPos;
//       out vec2 uv;
//       void main() {
//         uv = (aPos + 1.0) / 2.0;
//         gl_Position = vec4(aPos, 0.0, 1.0);
//       }`;
    
//     const fragmentShaderSource = `#version 300 es
//       precision highp float;
//       out vec4 FragColor;
//       void main() {
//         vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
//         FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
//       }`;

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
//     if (!vertexShader || !fragmentShader) {
//       setError("Shader compilation failed");
//       return;
//     }

//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
    
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//       console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
//       setError("Shader linking failed");
//       return;
//     }
    
//     gl.useProgram(shaderProgram);

//     const vertices = new Float32Array([
//       -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
//       -1.0,  1.0,  1.0, -1.0,  1.0,  1.0
//     ]);
    
//     const vao = gl.createVertexArray();
//     gl.bindVertexArray(vao);

//     const vbo = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const positionAttrib = gl.getAttribLocation(shaderProgram, "aPos");
//     gl.enableVertexAttribArray(positionAttrib);
//     gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
    
//     gl.drawArrays(gl.TRIANGLES, 0, 6);
//   };

//   useEffect(() => {
//     renderShader();
//   }, [shaderCode]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   let gl, program, angle = 0;

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });
      
//       const shaderText = response.data.candidates[0].content.parts[0].text;
//       setShaderCode(shaderText);
      
//       requestAnimationFrame(renderShader);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode("Error in shader generation");
//     }
//   };

//   const compileShader = (source, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//       return null;
//     }
//     return shader;
//   };

//   const renderShader = () => {
//     if (!canvasRef.current) return;

//     gl = canvasRef.current.getContext("webgl2");
//     if (!gl) {
//       setError("WebGL2 is not supported in your browser");
//       return;
//     }

//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.enable(gl.DEPTH_TEST);

//     const vertexShaderSource = `#version 300 es
//       precision highp float;
//       layout(location = 0) in vec3 aPosition;
//       uniform mat4 uModel;
//       uniform mat4 uView;
//       uniform mat4 uProjection;
//       void main() {
//         gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
//       }`;

//     const fragmentShaderSource = `#version 300 es
//       precision highp float;
//       out vec4 FragColor;
//       void main() {
//         FragColor = vec4(0.0, 0.8, 1.0, 1.0);
//       }`;

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
//     if (!vertexShader || !fragmentShader) {
//       setError("Shader compilation failed");
//       return;
//     }

//     program = gl.createProgram();
//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);

//     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//       console.error("Shader program link error:", gl.getProgramInfoLog(program));
//       setError("Shader linking failed");
//       return;
//     }

//     gl.useProgram(program);

//     const cubeVertices = new Float32Array([
//       // Front face
//       -0.5, -0.5,  0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5,
//       -0.5,  0.5,  0.5, -0.5, -0.5,  0.5,  0.5,  0.5,  0.5,
//       // Back face
//       -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,
//       0.5, -0.5, -0.5,  -0.5, -0.5, -0.5,   0.5,  0.5, -0.5,
//     ]);

//     const vao = gl.createVertexArray();
//     gl.bindVertexArray(vao);

//     const vbo = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
//     gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

//     const positionAttrib = gl.getAttribLocation(program, "aPosition");
//     gl.enableVertexAttribArray(positionAttrib);
//     gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

//     function animate() {
//       angle += 0.01;
//       const cosA = Math.cos(angle);
//       const sinA = Math.sin(angle);

//       const modelMatrix = new Float32Array([
//         cosA, 0, sinA, 0,
//         0,    1, 0,    0,
//         -sinA, 0, cosA, 0,
//         0,    0, 0,    1
//       ]);

//       const viewMatrix = new Float32Array([
//         1, 0, 0, 0,
//         0, 1, 0, -2.5,
//         0, 0, 1, -5,
//         0, 0, 0, 1
//       ]);

//       const projectionMatrix = new Float32Array([
//         1.2, 0, 0, 0,
//         0, 1.6, 0, 0,
//         0, 0, -1.01, -1,
//         0, 0, -0.02, 0
//       ]);

//       gl.uniformMatrix4fv(gl.getUniformLocation(program, "uModel"), false, modelMatrix);
//       gl.uniformMatrix4fv(gl.getUniformLocation(program, "uView"), false, viewMatrix);
//       gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjection"), false, projectionMatrix);

//       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//       gl.drawArrays(gl.TRIANGLES, 0, 12);
      
//       requestAnimationFrame(animate);
//     }

//     animate();
//   };

//   useEffect(() => {
//     renderShader();
//   }, [shaderCode]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { mat4 } from "gl-matrix";

// export default function TextToShader() {
//   const [description, setDescription] = useState("");
//   const [shaderCode, setShaderCode] = useState(null);
//   const [error, setError] = useState(null);
//   const canvasRef = useRef(null);
//   let gl;
//   let angle = 0;

//   const handleGenerateShader = async () => {
//     try {
//       setError(null);
//       const response = await axios.post("http://localhost:4000/api/generate-shader", {
//         text: description,
//       });
      
//       const shaderText = response.data.candidates[0].content.parts[0].text;
//       setShaderCode(shaderText);
      
//       requestAnimationFrame(renderShader);
//     } catch (err) {
//       setError("Failed to generate shader");
//       setShaderCode("Error in shader generation");
//     }
//   };

//   const compileShader = (source, type) => {
//     const shader = gl.createShader(type);
//     gl.shaderSource(shader, source);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//       return null;
//     }
//     return shader;
//   };

//   const renderShader = () => {
//     if (!shaderCode || !canvasRef.current) return;

//     gl = canvasRef.current.getContext("webgl2");
//     if (!gl) {
//       setError("WebGL2 is not supported in your browser");
//       return;
//     }
    
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.enable(gl.DEPTH_TEST);

//     const vertexShaderSource = `#version 300 es
//       precision highp float;
//       layout(location = 0) in vec3 aPos;
//       uniform mat4 model;
//       uniform mat4 view;
//       uniform mat4 projection;
//       out vec3 ourColor;
//       void main() {
//         gl_Position = projection * view * model * vec4(aPos, 1.0);
//         ourColor = aPos;
//       }`;
    
//     const fragmentShaderSource = shaderCode;

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
//     if (!vertexShader || !fragmentShader) {
//       setError("Shader compilation failed");
//       return;
//     }
    
//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
    
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//       console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
//       setError("Shader linking failed");
//       return;
//     }
    
//     gl.useProgram(shaderProgram);

//     const cubeVertices = new Float32Array([
//       -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5,  0.5, -0.5,
//       -0.5,  0.5, -0.5,  -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,
//        0.5,  0.5,  0.5,  -0.5,  0.5,  0.5,
//     ]);
    
//     const vao = gl.createVertexArray();
//     gl.bindVertexArray(vao);

//     const vbo = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
//     gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

//     const positionAttrib = gl.getAttribLocation(shaderProgram, "aPos");
//     gl.enableVertexAttribArray(positionAttrib);
//     gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
    
//     const modelMatrix = mat4.create();
//     angle += 0.01;
//     mat4.rotateY(modelMatrix, modelMatrix, angle);

//     const viewMatrix = mat4.create();
//     mat4.lookAt(viewMatrix, [0, 0, 3], [0, 0, 0], [0, 1, 0]);

//     const projectionMatrix = mat4.create();
//     mat4.perspective(projectionMatrix, Math.PI / 4, 1, 0.1, 10);

//     gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "model"), false, modelMatrix);
//     gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "view"), false, viewMatrix);
//     gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "projection"), false, projectionMatrix);
    
//     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 8);
//     requestAnimationFrame(renderShader);
//   };

//   useEffect(() => {
//     renderShader();
//   }, [shaderCode]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Text-to-Shader</h1>
//       <textarea
//         className="border p-2 w-96 h-24"
//         placeholder="Describe the shader (e.g., 'A rotating cube with a gradient background')"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleGenerateShader} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Generate Shader
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
//       {shaderCode && (
//         <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
//           {shaderCode}
//         </pre>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { mat4 } from "gl-matrix";

export default function TextToShader() {
  const [description, setDescription] = useState("");
  const [shaderCode, setShaderCode] = useState(null);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  let gl;
  let angle = 0;

  const handleGenerateShader = async () => {
    try {
      setError(null);
      const response = await axios.post("http://localhost:4000/api/generate-shader", {
        text: description,
      });
      
      const shaderText = response.data.candidates[0].content.parts[0].text;
      setShaderCode(shaderText);
      
      requestAnimationFrame(renderShader);
    } catch (err) {
      setError("Failed to generate shader");
      setShaderCode("Error in shader generation");
    }
  };

  const compileShader = (source, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      setError(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  };

  const renderShader = () => {
    if (!shaderCode || !canvasRef.current) return;

    gl = canvasRef.current.getContext("webgl2");
    if (!gl) {
      setError("WebGL2 is not supported in your browser");
      return;
    }
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    const vertexShaderSource = `#version 300 es
      precision highp float;
      layout(location = 0) in vec3 aPos;
      uniform mat4 model;
      uniform mat4 view;
      uniform mat4 projection;
      out vec3 ourColor;
      void main() {
        gl_Position = projection * view * model * vec4(aPos, 1.0);
        ourColor = (aPos + 1.0) / 2.0; // Normalize position to [0,1] range
      }`;
    
    const fragmentShaderSource = shaderCode;

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
      setError("Shader compilation failed");
      return;
    }
    
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
      setError("Shader linking failed");
      return;
    }
    
    gl.useProgram(shaderProgram);

    const cubeVertices = new Float32Array([
      -0.5, -0.5, -0.5,    0.5, -0.5, -0.5,    0.5,  0.5, -0.5,   -0.5,  0.5, -0.5,
      -0.5, -0.5,  0.5,    0.5, -0.5,  0.5,    0.5,  0.5,  0.5,   -0.5,  0.5,  0.5,
    ]);
    
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(shaderProgram, "aPos");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
    
    const modelMatrix = mat4.create();
    mat4.rotateY(modelMatrix, modelMatrix, angle);
    angle += 0.01;

    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, [0, 0, 3], [0, 0, 0], [0, 1, 0]);

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, 1, 0.1, 10);

    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "model"), false, modelMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "view"), false, viewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "projection"), false, projectionMatrix);
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 8);
    requestAnimationFrame(renderShader);
  };

  useEffect(() => {
    renderShader();
  }, [shaderCode]);

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
      <canvas ref={canvasRef} className="border mt-4 w-96 h-96"></canvas>
      {shaderCode && (
        <pre className="mt-4 bg-gray-200 p-2 w-96 overflow-auto">
          {shaderCode}
        </pre>
      )}
    </div>
  );
}
