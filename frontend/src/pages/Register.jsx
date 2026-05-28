import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
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
        const res = await registerUser(form);

        localStorage.setItem("token", res.data.token);

        alert("Registration successful!");
        navigate("/create-character");
        } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Registration failed");
    }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-900">
        <form
            onSubmit={handleSubmit}
            className="bg-gray-700 p-8 rounded-lg shadow-lg w-96"
        >
            <h1 className="text-white text-2xl mb-6 text-center">Register</h1>

            <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            />

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
            className="w-full bg-blue-500 text-white p-3 rounded"
            >
            Register
            </button>
        </form>
        </div>
    );
}

export default Register;