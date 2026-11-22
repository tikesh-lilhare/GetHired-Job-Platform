import { useState } from "react";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import ScoreRing from "../components/ScoreRing";
import { getRecommendedJobs } from "../services/applicationService";
import { initials } from "../utils/format";
import toast from "../utils/toast";

function RecommendedJobs() {

    const [applicationId, setApplicationId] =
        useState("");

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const fetchRecommendations =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getRecommendedJobs(
                        applicationId
                    );

                console.log(
                    response.data
                );

                setJobs(
                    response.data
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to fetch recommendations"
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
                    eyebrow="AI powered"
                    title="AI Recommended Jobs"
                    subtitle="Enter an application ID and we’ll suggest roles that best match the skills found in that resume."
                />

                <div className="lookup">

                    <div className="input-icon">
                        <Icon name="file" size={18} />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Application ID"
                            value={applicationId}
                            onChange={(e) =>
                                setApplicationId(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={
                            fetchRecommendations
                        }
                    >
                        <Icon name="sparkles" size={16} />
                        Get Recommendations
                    </button>

                </div>

                {
                    loading && (
                        <Loader text="Loading Recommendations..." />
                    )
                }

                {
                    !loading &&
                    jobs.length === 0 && (
                        <EmptyState
                            icon="sparkles"
                            title="No Recommendations Found"
                            text="Enter a valid application ID above to see jobs that fit your resume."
                        />
                    )
                }

                {
                    !loading &&
                    jobs.length > 0 && (

                        <div className="list-stack">

                            {jobs.map(
                                (job, index) => (

                                    <div
                                        key={index}
                                        className="row-card rec-card"
                                    >

                                        <span className="co-logo">{initials(job.companyName)}</span>

                                        <div className="grow">

                                            <h3>
                                                {job.title}
                                            </h3>

                                            <div className="text-primary fw-semibold">
                                                {
                                                    job.companyName
                                                }
                                            </div>

                                            <p className="mt-3 mb-2 small">
                                                <strong>
                                                    Match Score:
                                                </strong>
                                                {" "}
                                                {
                                                    job.matchScore
                                                        .toFixed(2)
                                                }%
                                            </p>

                                            <div
                                                className="progress"
                                            >

                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width:
                                                        `${job.matchScore}%`
                                                    }}
                                                >
                                                    {
                                                        job.matchScore
                                                            .toFixed(0)
                                                    }%
                                                </div>

                                            </div>

                                        </div>

                                        <ScoreRing value={job.matchScore} size={92} stroke={9} />

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

export default RecommendedJobs;
