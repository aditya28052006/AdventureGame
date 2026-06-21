import { useState } from "react";
import { createCharacter } from "../api/characterApi";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.png";
import "../styles/Auth.css";

const CLASS_OPTIONS = [
    { value: "Warrior", icon: "⚔️", label: "Warrior" },
    { value: "Mage", icon: "🔮", label: "Mage" },
    { value: "Rogue", icon: "🗡️", label: "Rogue" },
];

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

    const handleClassSelect = (value) => {
        setForm({
            ...form,
            characterClass: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createCharacter(form);

            localStorage.setItem("character", JSON.stringify(res.data));

            alert("Character created!");
            navigate("/battle");
        } catch (err) {
            console.error(err);
            alert("Character creation failed");
        }
    };

    return (
        <div
            className="a-root"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="a-overlay" />
            <div className="a-content">
                <div className="a-card">
                    <div className="a-crest">🛡️</div>

                    <h1 className="a-title">
                        <span className="a-tswords">✕ </span>
                        Forge Your Hero
                        <span className="a-tswords"> ✕</span>
                    </h1>
                    <p className="a-subtitle">Choose your path</p>
                    <div className="a-divider" />

                    <form onSubmit={handleSubmit}>
                        <div className="a-field">
                            <label className="a-label">👤 Character Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name your hero"
                                onChange={handleChange}
                                className="a-input"
                            />
                        </div>

                        <div className="a-field">
                            <label className="a-label">✉️ Your Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                onChange={handleChange}
                                className="a-input"
                            />
                        </div>

                        <div className="a-field">
                            <label className="a-label">⚜️ Class</label>
                            <div className="a-class-grid">
                                {CLASS_OPTIONS.map((opt) => (
                                    <div
                                        key={opt.value}
                                        className={
                                            "a-class-card" +
                                            (form.characterClass === opt.value ? " active" : "")
                                        }
                                        onClick={() => handleClassSelect(opt.value)}
                                    >
                                        <span className="a-class-icon">{opt.icon}</span>
                                        <span className="a-class-name">{opt.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="a-submit">
                            ⚔ Create Character ⚔
                        </button>
                    </form>

                    <div className="a-skull">💀</div>
                </div>
            </div>
        </div>
    );
}

export default CreateCharacter;