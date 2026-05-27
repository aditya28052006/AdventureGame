import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await loginUser(form);

        localStorage.setItem("token", res.data.token);

        alert("Login successful!");
        navigate("/dashboard");
        } catch (err) {
        alert("Login failed");
        console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-900">
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
        >
            <h1 className="text-white text-2xl mb-6 text-center">Login</h1>

            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            />

            <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
            >
            Login
            </button>
        </form>
        </div>
    );
}

export default Login;