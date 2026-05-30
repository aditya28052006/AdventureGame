import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateCharacter from "./pages/CreateCharacter";
import ProtectedRoute from "./components/ProtectedRoute";
import Battle from "./pages/Battle";

function Dashboard() {
  const character = JSON.parse(localStorage.getItem("character"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("character");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6">Adventure Dashboard ⚔️</h1>

      {character && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl mb-4">{character.name}</h2>

          <p>Class: {character.characterClass}</p>
          <p>Level: {character.level}</p>
          <p>Health: {character.health}</p>
          <p>Attack: {character.attack}</p>
          <p>Defense: {character.defense}</p>
        </div>
      )}

      <button
        onClick={logout}
        className="bg-red-500 px-6 py-3 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-character" element={<CreateCharacter />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/battle" element={<Battle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;