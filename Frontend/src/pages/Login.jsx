import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import { loginUser } from "../services/authService";
import toast from "../utils/toast";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSubmitting(true);

            const response = await loginUser({

                email,
                password

            });

            console.log("Login Response:", response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "userId",
                response.data.id
            );

            localStorage.setItem(
                "name",
                response.data.name
            );

            toast.success("Login successful. Redirecting...");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 600);

        } catch (error) {

            console.error(error);

            toast.error("Login failed. Please check your email and password.");

            setSubmitting(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="auth-wrap">

                <aside className="auth-aside">
                    <span className="eyebrow" style={{ color: "var(--lime)" }}>Welcome back</span>
                    <h2>Your next role is <span>one match away.</span></h2>
                    <ul className="auth-points">
                        <li><Icon name="check" size={20} /> See your skill match score before you apply</li>
                        <li><Icon name="check" size={20} /> Track every application from applied to hired</li>
                        <li><Icon name="check" size={20} /> Recruiters: review ranked candidates and analytics</li>
                    </ul>
                </aside>

                <main className="auth-main">

                    <div className="auth-card">

                        <h1>Log in</h1>
                        <p className="sub">Enter your details to continue to GetHired.</p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="login-email">Email</label>
                                <div className="input-icon">
                                    <Icon name="mail" size={18} />
                                    <input
                                        id="login-email"
                                        type="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100"
                                disabled={submitting}
                            >
                                {submitting ? "Signing in..." : "Log in"}
                            </button>

                        </form>

                        <p className="auth-foot">
                            New to GetHired? <Link to="/register">Create an account</Link>
                        </p>

                    </div>

                </main>

            </div>
        </>

    );

}

export default Login;
