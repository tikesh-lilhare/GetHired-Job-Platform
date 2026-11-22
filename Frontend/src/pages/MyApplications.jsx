import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import StatusStepper from "../components/StatusStepper";
import { getApplicationsByUser }
from "../services/applicationService";
import toast from "../utils/toast";

function MyApplications() {

    const [applications,
           setApplications] =
           useState([]);

    const [userId,
           setUserId] =
           useState(localStorage.getItem("userId") || "");

    const [loading,
           setLoading] =
           useState(false);

    const fetchApplications =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getApplicationsByUser(
                        userId
                    );

                setApplications(
                    response.data
                );

            } catch(error) {

                console.error(error);

                toast.error(
                    "Failed to load applications"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <>

            <Navbar />

            <div className="container page">

                <PageHeader
                    eyebrow="Applications"
                    title="My Applications"
                    subtitle="Look up your applications and follow their progress."
                />

                <div className="lookup">

                    <div className="input-icon">
                        <Icon name="user" size={18} />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) =>
                                setUserId(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={
                            fetchApplications
                        }
                    >
                        <Icon name="search" size={16} />
                        Search
                    </button>

                </div>

                {

                    loading ?

                    (
                        <Loader text="Loading..." />
                    )

                    :

                    applications.length === 0 ?

                    (
                        <EmptyState
                            icon="inbox"
                            title="No Applications Found"
                            text="Once you apply for a job, it will show up here with its current status."
                        >
                            <Link to="/jobs" className="btn btn-primary">Browse jobs</Link>
                        </EmptyState>
                    )

                    :

                    (

                        <div className="list-stack">

                            {applications.map(
                                (app) => (

                                    <div
                                        className="row-card"
                                        key={app.id}
                                    >

                                        <div className="row-card-head">

                                            <h3>
                                                Application ID :
                                                {" "}
                                                {app.id}
                                            </h3>

                                            <StatusBadge status={app.status} />

                                        </div>

                                        <div className="kv">

                                            <span>
                                                <b>
                                                    Job ID :
                                                </b>
                                                {app.jobId}
                                            </span>

                                            <span>
                                                <b>
                                                    User ID :
                                                </b>
                                                {app.userId}
                                            </span>

                                            <span>
                                                <b>
                                                    Status :
                                                </b>
                                                {app.status}
                                            </span>

                                        </div>

                                        <StatusStepper status={app.status} />

                                    </div>

                                )
                            )}

                        </div>

                    )

                }

            </div>

        </>
    );
}

export default MyApplications;
