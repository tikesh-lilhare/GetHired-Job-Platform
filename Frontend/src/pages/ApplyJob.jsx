import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../NavBar";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import { applyJob }
from "../services/applicationService";
import toast from "../utils/toast";

function ApplyJob() {

    const { id } = useParams();

    const [userId,
           setUserId] =
           useState(localStorage.getItem("userId") || "");

    const [resume,
           setResume] =
           useState(null);

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setSubmitting(true);

                const formData =
                    new FormData();

                formData.append(
                    "resume",
                    resume
                );

                formData.append(
                    "userId",
                    userId
                );

                formData.append(
                    "jobId",
                    id
                );

                const response =
                    await applyJob(
                        formData
                    );

                toast.success(
                    "Application submitted successfully"
                );

                console.log(
                    response.data
                );

            } catch(error) {

               console.log("Full Error:", error);

                if(error.response){

                    console.log("Status:", error.response.status);

                    console.log("Data:", error.response.data);

                }

                toast.error(
                    "Application failed. Please try again."
                );

            } finally {

                setSubmitting(false);
            }
        };

    return (

        <>
            <Navbar />

            <div className="container page">

                <div className="narrow">

                    <PageHeader
                        eyebrow="Apply"
                        title="Apply For Job"
                        subtitle={`You're applying to job #${id}. Upload your resume as a PDF and we'll extract your skills and calculate your match.`}
                    />

                    <div className="form-panel">

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div
                                className="mb-4"
                            >

                                <label className="form-label" htmlFor="apply-user">
                                    User ID
                                </label>

                                <input
                                    id="apply-user"
                                    type="number"
                                    className="form-control"
                                    value={userId}
                                    onChange={
                                        (e) =>
                                        setUserId(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div
                                className="mb-2"
                            >

                                <label className="form-label">
                                    Upload Resume
                                </label>

                                <label className={`dropzone${resume ? " has-file" : ""}`}>

                                    <span className="icon-tile soft">
                                        <Icon name={resume ? "file" : "upload"} size={24} />
                                    </span>

                                    <strong>
                                        {resume ? resume.name : "Click to choose your resume"}
                                    </strong>

                                    <span>PDF only</span>

                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={
                                            (e) =>
                                            setResume(
                                                e.target.files[0]
                                            )
                                        }
                                        required
                                    />

                                </label>

                            </div>

                            <div className="form-actions">

                                <button
                                    className="btn btn-success btn-lg"
                                    disabled={submitting}
                                >
                                    <Icon name="send" size={18} />
                                    {submitting ? "Submitting..." : "Submit Application"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );
}

export default ApplyJob;
