import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import {
    getRecruiterJobs,
    deleteJob
} from "../services/Jobservice";
import { formatSalary, initials } from "../utils/format";
import toast from "../utils/toast";

function ManageJobs() {

    const [jobs, setJobs] =
        useState([]);


    async function loadJobs() {

        try {

            const recruiterId = localStorage.getItem("userId");

            console.log("Recruiter ID:", recruiterId);

            const response = await getRecruiterJobs(recruiterId);

            console.log("Jobs Response:", response.data);

            setJobs(response.data);

        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {

        loadJobs();

    }, []);


    const removeJob = async(id)=>{

        if(!window.confirm(
            "Delete this Job ?"
        )){
            return;
        }

        try {

            await deleteJob(id);

            toast.success("Job deleted");

            loadJobs();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete job");
        }

    };

    return(

        <>

        <Navbar/>

        <div className="container page">

            <PageHeader
                eyebrow="Recruiter"
                title="Manage Jobs"
                subtitle="Edit or remove the roles you’ve posted."
            >
                <Link to="/create-job" className="btn btn-primary">
                    <Icon name="plus" size={16} />
                    Create Job
                </Link>
            </PageHeader>

            {
                jobs.length === 0 && (
                    <EmptyState
                        icon="briefcase"
                        title="No jobs posted yet"
                        text="Create your first job listing to start receiving applications."
                    >
                        <Link to="/create-job" className="btn btn-primary">Create Job</Link>
                    </EmptyState>
                )
            }

            <div className="list-stack">

            {
                jobs.map(job=>(

                    <div
                    className="row-card"
                    key={job.id}
                    >

                        <div className="row-card-head">

                            <div className="d-flex gap-3 align-items-center">

                                <span className="co-logo">{initials(job.companyName)}</span>

                                <div>
                                    <h3>
                                        {job.title}
                                    </h3>
                                    <div className="text-primary fw-semibold">
                                        {job.companyName}
                                    </div>
                                </div>

                            </div>

                            <div className="d-flex gap-2">

                                <Link
                                to={`/edit-job/${job.id}`}
                                className="btn btn-warning btn-sm"
                                >
                                    <Icon name="edit" size={15} />
                                    Edit
                                </Link>

                                <button
                                className="btn btn-danger btn-sm"
                                onClick={()=>
                                    removeJob(job.id)
                                }
                                >
                                    <Icon name="trash" size={15} />
                                    Delete
                                </button>

                            </div>

                        </div>

                        <div className="job-meta mb-0">

                            <span><Icon name="pin" size={16} /> {job.location}</span>

                            <span><Icon name="wallet" size={16} /> ₹ {formatSalary(job.salary)}</span>

                        </div>

                    </div>

                ))
            }

            </div>

        </div>

        </>

    );
}

export default ManageJobs;
