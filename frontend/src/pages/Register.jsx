import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import backgroundImg from "../assets/background.png";
import "../styles/Auth.css";

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
        <div
            className="a-root"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="a-overlay" />
            <div className="a-content">
                <div className="a-card">
                    <div className="a-crest">📜</div>

                    <h1 className="a-title">
                        <span className="a-tswords">✕ </span>
                        Join the Quest
                        <span className="a-tswords"> ✕</span>
                    </h1>
                    <p className="a-subtitle">Begin your legend</p>
                    <div className="a-divider" />

                    <form onSubmit={handleSubmit}>
                        <div className="a-field">
                            <label className="a-label">👤 Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                onChange={handleChange}
                                className="a-input"
                            />
                        </div>

                        <div className="a-field">
                            <label className="a-label">✉️ Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                onChange={handleChange}
                                className="a-input"
                            />
                        </div>

                        <div className="a-field">
                            <label className="a-label">🔒 Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                className="a-input"
                            />
                        </div>

                        <button type="submit" className="a-submit">
                            ⚔ Register ⚔
                        </button>
                    </form>

                    <div className="a-footer">
                        Already an adventurer? <Link to="/login">Login</Link>
                    </div>

                    <div className="a-skull">💀</div>
                </div>
            </div>
        </div>
    );
}

export default Register;