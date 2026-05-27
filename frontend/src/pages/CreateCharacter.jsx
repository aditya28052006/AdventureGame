import { useState } from "react";
import { createCharacter } from "../api/characterApi";
import { useNavigate } from "react-router-dom";

function CreateCharacter() {
    const [form, setForm] = useState({
        name: "",
        characterClass: "Warrior",
        email: "",
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
        const res = await createCharacter(form);

        localStorage.setItem("character", JSON.stringify(res.data));

        alert("Character created!");
        navigate("/dashboard");
        } catch (err) {
        console.error(err);
        alert("Character creation failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
        >
            <h1 className="text-white text-2xl mb-6 text-center">
            Create Character
            </h1>

            <input
            type="text"
            name="name"
            placeholder="Character Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            />

            <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            />

            <select
            name="characterClass"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            >
            <option value="Warrior">Warrior ⚔️</option>
            <option value="Mage">Mage 🔮</option>
            <option value="Rogue">Rogue 🗡️</option>
            </select>

            <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded"
            >
            Create Character
            </button>
        </form>
        </div>
    );
}

export default CreateCharacter;