import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import backgroundImg from "../assets/background.png";
import "../styles/Auth.css";

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
            navigate("/battle");
        } catch (err) {
            alert("Login failed");
            console.error(err);
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
                    <div className="a-crest">🗝️</div>

                    <h1 className="a-title">
                        <span className="a-tswords">✕ </span>
                        Enter Realm
                        <span className="a-tswords"> ✕</span>
                    </h1>
                    <p className="a-subtitle">Return, adventurer</p>
                    <div className="a-divider" />

                    <form onSubmit={handleSubmit}>
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
                            ⚔ Login ⚔
                        </button>
                    </form>

                    <div className="a-footer">
                        New to the realm? <Link to="/register">Create an account</Link>
                    </div>

                    <div className="a-skull">💀</div>
                </div>
            </div>
        </div>
    );
}

export default Login;