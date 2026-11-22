import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";

const STATS = [
    { label: "Total Jobs", value: "100+", icon: "briefcase" },
    { label: "Applications", value: "20+", icon: "inbox" },
    { label: "Recommended Jobs", value: "15+", icon: "sparkles" },
];

const ACTIONS = [
    { to: "/jobs", label: "Browse Jobs", hint: "Explore open roles", icon: "search" },
    { to: "/my-applications", label: "My Applications", hint: "Check your status", icon: "inbox" },
    { to: "/recommended-jobs", label: "Recommendations", hint: "Jobs picked for you", icon: "sparkles" },
    { to: "/profile", label: "Profile", hint: "Keep your details fresh", icon: "user" },
];

const FEATURES = [
    { icon: "file", title: "Resume Parsing", text: "Extract skills automatically from uploaded resumes." },
    { icon: "target", title: "Skill Matching", text: "Match resumes with job requirements using AI." },
    { icon: "sparkles", title: "Job Recommendations", text: "Personalized job recommendations based on skills." },
];

function Dashboard() {

    const name = localStorage.getItem("name");

    return (

        <>

            <Navbar />

            <div className="container page">

                {/* Hero Section */}

                <div className="welcome">

                    <span className="eyebrow">Dashboard</span>

                    <h1>
                        {name ? <>Welcome back, <span>{name}</span></> : "Welcome to GetHired"}
                    </h1>

                    <p>
                        Discover jobs tailored to your skills using Resume Parsing,
                        Skill Matching and AI Based Recommendations.
                    </p>

                </div>

                {/* Statistics */}

                <div className="stat-grid">

                    {STATS.map((s) => (
                        <div className="stat" key={s.label}>
                            <span className="icon-tile soft sm"><Icon name={s.icon} size={20} /></span>
                            <div className="num">{s.value}</div>
                            <div className="lbl">{s.label}</div>
                        </div>
                    ))}

                </div>

                {/* Quick Actions */}

                <h2 className="block-title">Quick Actions</h2>

                <div className="action-grid">

                    {ACTIONS.map((a) => (
                        <Link to={a.to} className="action-tile" key={a.to}>
                            <span className="icon-tile sm"><Icon name={a.icon} size={20} /></span>
                            <div>
                                <div className="go">
                                    {a.label}
                                    <Icon name="arrow" size={18} />
                                </div>
                                <small className="text-muted">{a.hint}</small>
                            </div>
                        </Link>
                    ))}

                </div>

                {/* Features */}

                <h2 className="block-title">Platform Features</h2>

                <div className="feature-grid">

                    {FEATURES.map((f) => (
                        <div className="feature" style={{ background: "#fff" }} key={f.title}>
                            <span className="icon-tile"><Icon name={f.icon} size={22} /></span>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </div>
                    ))}

                </div>

            </div>

        </>
    );
}

export default Dashboard;
