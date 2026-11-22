import { useState } from "react";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import { createJob } from "../services/Jobservice";
import toast from "../utils/toast";

function CreateJob() {

  const [job, setJob] = useState({

    title: "",
    description: "",
    location: "",
    salary: "",
    companyName: "",
    skills: "",
    recruiterId:
    localStorage.getItem("userId")

});

    const handleChange = (e) => {

        setJob({

            ...job,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await createJob(job);

                console.log(
                    response.data
                );

                toast.success(
                    "Job created successfully"
                );

                setJob({

                    title: "",
                    companyName: "",
                    location: "",
                    salary: "",
                    skills: "",
                    description: ""
                });

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to create job"
                );
            }
        };

    return (

        <>

            <Navbar />

            <div className="container page">

                <div className="narrow">

                    <PageHeader
                        eyebrow="Recruiter"
                        title="Create Job"
                        subtitle="Describe the role and list the skills you need. Candidates are matched against these skills."
                    />

                    <div className="form-panel">

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="form-grid">

                                <div>
                                    <label className="form-label" htmlFor="cj-title">
                                        Job Title
                                    </label>
                                    <input
                                        id="cj-title"
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="e.g. Java Backend Developer"
                                        value={job.title}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="cj-company">
                                        Company Name
                                    </label>
                                    <input
                                        id="cj-company"
                                        type="text"
                                        name="companyName"
                                        className="form-control"
                                        value={job.companyName}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="cj-location">
                                        Location
                                    </label>
                                    <input
                                        id="cj-location"
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        value={job.location}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="cj-salary">
                                        Salary
                                    </label>
                                    <input
                                        id="cj-salary"
                                        type="number"
                                        name="salary"
                                        className="form-control"
                                        value={job.salary}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                                <div className="full">
                                    <label className="form-label" htmlFor="cj-skills">
                                        Skills
                                    </label>
                                    <input
                                        id="cj-skills"
                                        type="text"
                                        name="skills"
                                        className="form-control"
                                        placeholder="Java, Spring Boot, MySQL"
                                        value={job.skills}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                                <div className="full">
                                    <label className="form-label" htmlFor="cj-desc">
                                        Description
                                    </label>
                                    <textarea
                                        id="cj-desc"
                                        rows="5"
                                        name="description"
                                        className="form-control"
                                        value={job.description}
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>

                            </div>

                            <div className="form-actions">

                                <button
                                    className="btn btn-primary btn-lg"
                                >
                                    <Icon name="plus" size={18} />
                                    Create Job
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>
    );
}

export default CreateJob;
