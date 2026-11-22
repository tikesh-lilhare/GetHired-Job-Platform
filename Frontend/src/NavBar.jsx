import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import Icon from "./components/Icon";
import { initials } from "./utils/format";

const linkClass = ({ isActive }) => `gh-link${isActive ? " active" : ""}`;

function Navbar() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [recruiterOpen, setRecruiterOpen] = useState(false);
    const dropdownRef = useRef(null);

    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    // close the recruiter dropdown when clicking elsewhere
    useEffect(() => {
        const onClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setRecruiterOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const closeAll = () => {
        setOpen(false);
        setRecruiterOpen(false);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");

        closeAll();
        navigate("/");
    };

    return (

        <header className="gh-nav">

            <div className="container gh-nav-inner">

                <Link className="gh-brand" to={token ? "/dashboard" : "/"} onClick={closeAll}>
                    <Logo />
                    GetHired
                </Link>

                <button
                    className="gh-menu-btn"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    <Icon name={open ? "close" : "menu"} size={22} />
                </button>

                <nav className={`gh-collapse${open ? " open" : ""}`}>

                    {token ? (

                        <>
                            <ul className="gh-links">

                                <li><NavLink className={linkClass} to="/dashboard" onClick={closeAll}>Dashboard</NavLink></li>
                                <li><NavLink className={linkClass} end to="/jobs" onClick={closeAll}>Jobs</NavLink></li>
                                <li><NavLink className={linkClass} to="/my-applications" onClick={closeAll}>My Applications</NavLink></li>
                                <li><NavLink className={linkClass} to="/recommended-jobs" onClick={closeAll}>Recommended Jobs</NavLink></li>
                                <li><NavLink className={linkClass} to="/profile" onClick={closeAll}>Profile</NavLink></li>

                                <li className="gh-dropdown" ref={dropdownRef}>

                                    <button
                                        type="button"
                                        className="gh-link"
                                        aria-expanded={recruiterOpen}
                                        onClick={() => setRecruiterOpen(!recruiterOpen)}
                                    >
                                        Recruiter
                                        <Icon name="chevron" size={16} />
                                    </button>

                                    {recruiterOpen && (
                                        <div className="gh-dropdown-panel">
                                            <NavLink className={linkClass} to="/create-job" onClick={closeAll}>Create Job</NavLink>
                                            <NavLink className={linkClass} to="/manage-jobs" onClick={closeAll}>Manage Jobs</NavLink>
                                            <NavLink className={linkClass} to="/view-applicants" onClick={closeAll}>View Applicants</NavLink>
                                            <NavLink className={linkClass} to="/recruiter-dashboard" onClick={closeAll}>Recruiter Dashboard</NavLink>
                                        </div>
                                    )}

                                </li>

                            </ul>

                            <div className="gh-actions">
                                <span className="gh-avatar" title={name || "Account"}>{initials(name || "U")}</span>
                                <button className="btn btn-secondary btn-sm" onClick={logout}>
                                    <Icon name="logout" size={16} />
                                    Logout
                                </button>
                            </div>
                        </>

                    ) : (

                        <>
                            <ul className="gh-links">
                                <li><Link className="gh-link" to="/#features" onClick={closeAll}>Features</Link></li>
                                <li><Link className="gh-link" to="/#how-it-works" onClick={closeAll}>How it works</Link></li>
                                <li><NavLink className={linkClass} end to="/jobs" onClick={closeAll}>Browse Jobs</NavLink></li>
                            </ul>

                            <div className="gh-actions">
                                <Link className="btn btn-ghost" to="/login" onClick={closeAll}>Log in</Link>
                                <Link className="btn btn-primary" to="/register" onClick={closeAll}>Get started</Link>
                            </div>
                        </>

                    )}

                </nav>

            </div>

        </header>
    );
}

export default Navbar;
