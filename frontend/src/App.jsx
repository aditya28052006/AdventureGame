import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl mb-6">
        Welcome to Adventure Game Dashboard ⚔️
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-6 py-3 rounded"
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

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;