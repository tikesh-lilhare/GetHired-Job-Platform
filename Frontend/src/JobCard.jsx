import { Link } from "react-router-dom";
import Icon from "./components/Icon";
import { formatSalary, initials, splitSkills } from "./utils/format";

function JobCard({ job }) {

    const skills = splitSkills(job.skills);

    return (

        <div className="job-card">

            <div className="job-card-top">

                <span className="co-logo">{initials(job.companyName)}</span>

                <div style={{ minWidth: 0 }}>
                    <h3>{job.title}</h3>
                    <div className="company">{job.companyName}</div>
                </div>

            </div>

            <div className="job-meta">
                <span><Icon name="pin" size={16} /> {job.location}</span>
                <span><Icon name="wallet" size={16} /> ₹ {formatSalary(job.salary)}</span>
            </div>

            <div className="skill-row">
                {skills.slice(0, 4).map((skill, i) => (
                    <span className="skill" key={i}>{skill}</span>
                ))}
                {skills.length > 4 && <span className="skill neutral">+{skills.length - 4}</span>}
            </div>

            <Link to={`/jobs/${job.id}`} className="btn btn-secondary">
                View Details
                <Icon name="arrow" size={16} />
            </Link>

        </div>
    );
}

export default JobCard;
