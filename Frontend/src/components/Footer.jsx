import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
    return (
        <footer className="gh-footer">
            <div className="container">
                <div className="gh-footer-grid">
                    <div>
                        <span className="gh-brand">
                            <Logo size={32} /> GetHired
                        </span>
                        <p className="mt-3" style={{ maxWidth: "34ch" }}>
                            A job portal that matches people to roles by skill — with resume parsing, smart recommendations and clear application tracking.
                        </p>
                    </div>
                    <div>
                        <h6>Job seekers</h6>
                        <Link to="/jobs">Browse jobs</Link>
                        <Link to="/register">Create account</Link>
                        <Link to="/recommended-jobs">Recommendations</Link>
                    </div>
                    <div>
                        <h6>Recruiters</h6>
                        <Link to="/register">Start hiring</Link>
                        <Link to="/create-job">Post a job</Link>
                        <Link to="/recruiter-dashboard">Analytics</Link>
                    </div>
                    <div>
                        <h6>Account</h6>
                        <Link to="/login">Log in</Link>
                        <Link to="/profile">My profile</Link>
                        <Link to="/my-applications">My applications</Link>
                    </div>
                </div>
                <div className="gh-footer-bottom">
                    <span>© {new Date().getFullYear()} GetHired. All rights reserved.</span>
                    <span>Built with Spring Boot microservices &amp; React</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
