import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../NavBar";
import JobCard from "../JobCard";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getAllJobs } from "../services/Jobservice";

const POPULAR = ["Java", "Spring Boot", "React", "Python", "SQL", "AWS", "DevOps"];

const FEATURES = [
    { icon: "file", title: "Resume Parsing", text: "Upload a PDF and skills are extracted automatically — no retyping your CV into forms." },
    { icon: "target", title: "Skill Matching", text: "Every application is scored against the job’s required skills, so the best fits rise to the top." },
    { icon: "sparkles", title: "Job Recommendations", text: "Get personalised roles based on what is actually in your resume, not just a keyword search." },
    { icon: "layers", title: "Skill Gap Analysis", text: "See matched and missing skills for a role, so you know exactly what to learn next." },
    { icon: "inbox", title: "Application Tracking", text: "Follow every application from applied to shortlisted, interview and hired in one place." },
    { icon: "chart", title: "Recruiter Analytics", text: "Dashboards and charts show your hiring funnel at a glance: applications, shortlists and hires." },
];

const STEPS = {
    seeker: [
        { title: "Create your profile", text: "Sign up as a job seeker and add your education, experience and skills." },
        { title: "Apply with your resume", text: "Upload a PDF. We parse it, extract your skills and calculate a match score." },
        { title: "Track every step", text: "Watch your status move from shortlisted to interview to offer, and get recommendations." },
    ],
    recruiter: [
        { title: "Post a role", text: "Add the title, salary, location and the skills you need. It goes live straight away." },
        { title: "Review ranked candidates", text: "See match scores, resume skills and an AI skill-gap analysis for every applicant." },
        { title: "Move people forward", text: "Shortlist, schedule interviews and hire, then follow progress on your analytics dashboard." },
    ],
};

function Home() {

    const navigate = useNavigate();
    const location = useLocation();

    const [query, setQuery] = useState("");
    const [tab, setTab] = useState("seeker");
    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        let active = true;
        getAllJobs()
            .then((res) => {
                if (!active) return;
                setJobs(Array.isArray(res.data) ? res.data : []);
                setStatus("ok");
            })
            .catch(() => active && setStatus("error"));
        return () => { active = false; };
    }, []);

    // scroll to #features / #how-it-works when arriving from another page
    useEffect(() => {
        if (!location.hash) return;
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, [location.hash]);

    const handleSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : "/jobs");
    };

    const latest = [...jobs].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 6);

    return (

        <>
            <Navbar />

            {/* ---------------- Hero ---------------- */}
            <section className="hero">
                <div className="container">
                    <div className="row align-items-center g-5">

                        <div className="col-lg-7">

                            <span className="chip brand">
                                <Icon name="sparkles" size={14} /> AI-powered job matching
                            </span>

                            <h1>
                                Get hired for the skills you <span className="mark">actually have.</span>
                            </h1>

                            <p className="hero-lead">
                                GetHired reads your resume, matches your skills to open roles and shows
                                you exactly what to learn next. Recruiters get ranked candidates, not piles of PDFs.
                            </p>

                            <form className="hero-search" onSubmit={handleSearch}>
                                <div className="input-icon">
                                    <Icon name="search" size={20} />
                                    <input
                                        className="form-control"
                                        placeholder="Job title, company or skill"
                                        aria-label="Search jobs"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg" type="submit">
                                    Search jobs
                                </button>
                            </form>

                            <div className="hero-chips">
                                <span>Popular:</span>
                                {POPULAR.map((s) => (
                                    <Link key={s} className="chip" to={`/jobs?q=${encodeURIComponent(s)}`}>{s}</Link>
                                ))}
                            </div>

                            <div className="hero-trust">
                                <span><Icon name="check" size={18} /> Resume skill extraction</span>
                                <span><Icon name="check" size={18} /> Instant match scores</span>
                                <span><Icon name="check" size={18} /> Live status tracking</span>
                            </div>

                        </div>

                        <div className="col-lg-5">
                            <div className="hero-visual" aria-hidden="true">

                                <div className="mock-card mock-pill">
                                    <Icon name="sparkles" size={16} /> 92% skill match
                                </div>

                                <div className="mock-card mock-main">
                                    <div className="mock-head">
                                        <span className="co-logo">N</span>
                                        <div>
                                            <div className="mock-title">Java Backend Developer</div>
                                            <div className="mock-sub">Northwind Labs</div>
                                        </div>
                                    </div>
                                    <div className="mock-meta">
                                        <span><Icon name="pin" size={14} /> Pune</span>
                                        <span><Icon name="wallet" size={14} /> ₹ 12,00,000</span>
                                    </div>
                                    <div className="skill-row mb-0">
                                        <span className="skill">Java</span>
                                        <span className="skill">Spring Boot</span>
                                        <span className="skill">MySQL</span>
                                        <span className="skill miss">Docker</span>
                                    </div>
                                    <div className="mock-tag">Match score</div>
                                    <div className="mock-bar"><i style={{ width: "92%" }} /></div>
                                    <div className="mock-row">
                                        <span>3 of 4 skills matched</span>
                                        <span style={{ color: "var(--brand-600)" }}>92%</span>
                                    </div>
                                </div>

                                <div className="mock-card mock-side">
                                    <div className="mock-tag" style={{ marginTop: 0 }}>Application status</div>
                                    <div className="stepper mt-2">
                                        <div className="s done"><span className="dot"><Icon name="check" size={12} strokeWidth={3} /></span>Applied</div>
                                        <span className="bar done" />
                                        <div className="s done"><span className="dot"><Icon name="check" size={12} strokeWidth={3} /></span>Shortlisted</div>
                                        <span className="bar" />
                                        <div className="s"><span className="dot" />Interview</div>
                                    </div>
                                </div>

                                <span className="sample-note">Illustrative example</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ---------------- Features ---------------- */}
            <section className="section alt" id="features">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Why GetHired</span>
                        <h2>Everything between “apply” and “hired”.</h2>
                        <p>One platform for job seekers and recruiters, built around skills instead of guesswork.</p>
                    </div>

                    <div className="feature-grid">
                        {FEATURES.map((f) => (
                            <div className="feature" key={f.title}>
                                <span className="icon-tile"><Icon name={f.icon} size={22} /></span>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- How it works ---------------- */}
            <section className="section" id="how-it-works">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">How it works</span>
                        <h2>Three steps, whichever side you’re on.</h2>
                    </div>

                    <div className="steps-tabs" role="tablist">
                        <button role="tab" aria-selected={tab === "seeker"} className={tab === "seeker" ? "active" : ""} onClick={() => setTab("seeker")}>
                            For job seekers
                        </button>
                        <button role="tab" aria-selected={tab === "recruiter"} className={tab === "recruiter" ? "active" : ""} onClick={() => setTab("recruiter")}>
                            For recruiters
                        </button>
                    </div>

                    <div className="steps" key={tab}>
                        {STEPS[tab].map((s) => (
                            <div className="step" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Latest jobs ---------------- */}
            <section className="section alt" id="jobs">
                <div className="container">
                    <div className="page-head">
                        <div>
                            <span className="eyebrow">Open roles</span>
                            <h2 className="mt-2 mb-0" style={{ fontSize: "clamp(1.9rem,3.6vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
                                Latest opportunities
                            </h2>
                        </div>
                        <Link to="/jobs" className="btn btn-secondary">
                            View all jobs <Icon name="arrow" size={16} />
                        </Link>
                    </div>

                    {status === "loading" && <Loader text="Loading latest jobs..." />}

                    {status === "ok" && latest.length > 0 && (
                        <div className="jobs-grid">
                            {latest.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    )}

                    {status === "ok" && latest.length === 0 && (
                        <EmptyState icon="briefcase" title="No openings yet" text="New roles will show up here as soon as recruiters post them.">
                            <Link to="/register" className="btn btn-primary">Post the first job</Link>
                        </EmptyState>
                    )}

                    {status === "error" && (
                        <EmptyState icon="briefcase" title="Sign in to see live openings" text="Create a free account or log in to browse every open role and apply in minutes.">
                            <div className="d-flex gap-2 justify-content-center flex-wrap">
                                <Link to="/register" className="btn btn-primary">Create account</Link>
                                <Link to="/login" className="btn btn-secondary">Log in</Link>
                            </div>
                        </EmptyState>
                    )}
                </div>
            </section>

            {/* ---------------- CTA ---------------- */}
            <section className="section">
                <div className="container">
                    <div className="cta-band">
                        <div>
                            <h2>Ready to find your next role, or your next hire?</h2>
                            <p>Join as a job seeker to get matched by skill, or as a recruiter to receive ranked applicants.</p>
                        </div>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-success btn-lg">Create free account</Link>
                            <Link to="/login" className="btn btn-outline-light-gh btn-lg">Log in</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
