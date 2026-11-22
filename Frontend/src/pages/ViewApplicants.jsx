import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import {
    getApplicantsByJob,
    updateApplicationStatus
} from "../services/applicationService";
import toast from "../utils/toast";

function ViewApplicants() {

    const [jobId, setJobId] = useState("");

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchApplicants = async () => {

        try {

            setLoading(true);

            const response = await getApplicantsByJob(jobId);

            setApplications(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load applicants");

        } finally {

            setLoading(false);

        }
    };

    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            toast.success("Status updated");

            fetchApplicants();

        } catch (error) {

            console.error(error);

            toast.error("Failed to update status");

        }
    };

    return (

        <>

            <Navbar />

            <div className="container page">

                <PageHeader
                    eyebrow="Recruiter"
                    title="View Applicants"
                    subtitle="Look up applicants by job ID, then shortlist, schedule interviews or hire."
                />

                <div className="lookup">

                    <div className="input-icon">
                        <Icon name="briefcase" size={18} />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Job ID"
                            value={jobId}
                            onChange={(e) =>
                                setJobId(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={fetchApplicants}
                    >
                        <Icon name="search" size={16} />
                        Search
                    </button>

                </div>

                {

                    loading ?

                        <Loader text="Loading..." />

                        :

                        applications.length === 0 ?

                            <EmptyState
                                icon="users"
                                title="No Applicants Found"
                                text="Enter a job ID and press search to see who has applied."
                            />

                            :

                            <div className="list-stack">

                            {applications.map((app) => (

                                <div
                                    key={app.id}
                                    className="row-card"
                                >

                                    <div className="row-card-head">

                                        <h3>
                                            Application ID : {app.id}
                                        </h3>

                                        <StatusBadge status={app.status} />

                                    </div>

                                    <div className="kv">

                                        <span>
                                            <b>User ID :</b>{" "}
                                            {app.userId}
                                        </span>

                                        <span>
                                            <b>Job ID :</b>{" "}
                                            {app.jobId}
                                        </span>

                                        <span>
                                            <b>Status :</b>{" "}
                                            {app.status}
                                        </span>

                                    </div>

                                    <div className="row-actions">

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "SHORTLISTED"
                                                )
                                            }
                                        >
                                            Shortlist
                                        </button>

                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "INTERVIEW_SCHEDULED"
                                                )
                                            }
                                        >
                                            Interview
                                        </button>

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "HIRED"
                                                )
                                            }
                                        >
                                            Select
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "REJECTED"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                        <Link
                                            to={`/candidate/${app.id}`}
                                            className="btn btn-primary btn-sm ms-md-auto"
                                        >
                                            View Candidate
                                            <Icon name="arrow" size={15} />
                                        </Link>

                                    </div>

                                </div>

                            ))}

                            </div>

                }

            </div>

        </>
    );
}

export default ViewApplicants;
