import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getJobById } from "../services/Jobservice";
import { formatSalary, initials, splitSkills } from "../utils/format";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [loading, setLoading] =
        useState(true);


    async function fetchJob() {

        try {

            const response =
                await getJobById(id);

            setJob(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        fetchJob();

    }, []);


    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container page">
                    <Loader text="Loading Job Details..." />
                </div>
            </>
        );
    }

    if (!job) {

        return (

            <>
                <Navbar />

                <div className="container page">

                    <EmptyState icon="search" title="Job Not Found" text="This job may have been removed, or you may need to log in to view it.">
                        <Link to="/jobs" className="btn btn-primary">Back to jobs</Link>
                    </EmptyState>

                </div>

            </>
        );
    }

    return (

        <>
            <Navbar />

            <div className="container page">

                <Link to="/jobs" className="btn btn-ghost btn-sm mb-3">
                    <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Back to jobs
                </Link>

                <div className="detail-layout">

                    <div className="detail-main">

                        <div className="detail-title">

                            <span className="co-logo">{initials(job.companyName)}</span>

                            <div>
                                <h1>{job.title}</h1>
                                <div className="text-muted fw-semibold">{job.companyName}</div>
                            </div>

                        </div>

                        <h6 className="sub-h">Required Skills</h6>

                        <div className="skill-row">

                            {
                                splitSkills(job.skills)
                                    .map((skill, index) => (

                                        <span
                                            key={index}
                                            className="skill"
                                        >
                                            {skill}
                                        </span>

                                    ))
                            }

                        </div>

                        <h6 className="sub-h">Job Description</h6>

                        <div className="rich">

                            {job.description}

                        </div>

                    </div>

                    <aside className="side-card">

                        <div className="fact">
                            <span className="icon-tile soft sm"><Icon name="pin" size={18} /></span>
                            <div><small>Location</small><strong>{job.location}</strong></div>
                        </div>

                        <div className="fact">
                            <span className="icon-tile soft sm"><Icon name="wallet" size={18} /></span>
                            <div><small>Salary</small><strong>₹ {formatSalary(job.salary)}</strong></div>
                        </div>

                        <div className="fact">
                            <span className="icon-tile soft sm"><Icon name="building" size={18} /></span>
                            <div><small>Company</small><strong>{job.companyName}</strong></div>
                        </div>

                        <Link
                            to={`/apply/${job.id}`}
                            className="btn btn-success btn-lg w-100 mt-3"
                        >
                            Apply Now
                            <Icon name="send" size={18} />
                        </Link>

                        <Link
                            to="/jobs"
                            className="btn btn-secondary w-100 mt-2"
                        >
                            Back
                        </Link>

                    </aside>

                </div>

            </div>

        </>
    );
}

export default JobDetails;
