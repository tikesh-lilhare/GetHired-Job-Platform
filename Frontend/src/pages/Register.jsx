import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import { registerUser } from "../services/authService";
import toast from "../utils/toast";

function Register() {

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] =
        useState({

            name: "",
            email: "",
            password: "",
            role: "JOB_SEEKER"
        });

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setSubmitting(true);

                await registerUser(
                    formData
                );

                toast.success("Registration successful. Please log in.");

                setTimeout(() => navigate("/login"), 900);

            } catch {

                toast.error("Registration failed. Please try again.");

                setSubmitting(false);
            }
        };

    return (

        <>
            <Navbar />

            <div className="auth-wrap">

                <aside className="auth-aside">
                    <span className="eyebrow" style={{ color: "var(--lime)" }}>Join GetHired</span>
                    <h2>Get matched by <span>skill</span>, not luck.</h2>
                    <ul className="auth-points">
                        <li><Icon name="check" size={20} /> Resume parsing pulls your skills out automatically</li>
                        <li><Icon name="check" size={20} /> Personalised job recommendations</li>
                        <li><Icon name="check" size={20} /> Post jobs and review ranked applicants as a recruiter</li>
                    </ul>
                </aside>

                <main className="auth-main">

                    <div className="auth-card">

                        <h1>Create your account</h1>
                        <p className="sub">It takes less than a minute.</p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">I am a…</label>
                                <div className="role-picker">
                                    <label className="role-option">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="JOB_SEEKER"
                                            checked={formData.role === "JOB_SEEKER"}
                                            onChange={handleChange}
                                        />
                                        <span className="box">
                                            <Icon name="user" size={22} />
                                            <strong>Job Seeker</strong>
                                            <span>Find and apply to jobs</span>
                                        </span>
                                    </label>
                                    <label className="role-option">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="RECRUITER"
                                            checked={formData.role === "RECRUITER"}
                                            onChange={handleChange}
                                        />
                                        <span className="box">
                                            <Icon name="briefcase" size={22} />
                                            <strong>Recruiter</strong>
                                            <span>Post jobs and hire</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="reg-name">Full name</label>
                                <input
                                    id="reg-name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="reg-email">Email</label>
                                <input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="reg-password">Password</label>
                                <input
                                    id="reg-password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                className="btn btn-primary btn-lg w-100"
                                disabled={submitting}
                            >
                                {submitting ? "Creating account..." : "Create account"}
                            </button>

                        </form>

                        <p className="auth-foot">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>

                    </div>

                </main>

            </div>
        </>
    );
}

export default Register;
