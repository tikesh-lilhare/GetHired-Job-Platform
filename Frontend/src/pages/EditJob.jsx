import { useState, useEffect } from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";
import Navbar from "../NavBar";
import PageHeader from "../components/PageHeader";
import {
    getJobById,
    updateJob
} from "../services/Jobservice";
import toast from "../utils/toast";

function EditJob(){

    const {id}=useParams();

    const navigate=useNavigate();

    const [job,setJob]=useState({

        title:"",
        description:"",
        location:"",
        salary:"",
        companyName:"",
        skills:"",
        recruiterId:
        localStorage.getItem("userId")

    });


    async function loadJob() {

        try{

            const response=
                await getJobById(id);

            setJob(response.data);

        }
        catch(error){

            console.log(error);

            toast.error("Failed to load job");
        }

    }

    useEffect(()=>{

        loadJob();

    },[]);


    const handleChange=(e)=>{

        setJob({

            ...job,

            [e.target.name]:
            e.target.value

        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await updateJob(
                id,
                job
            );

            toast.success("Job updated");

            navigate("/manage-jobs");

        }
        catch(error){

            console.log(error);

            toast.error("Failed to update job");
        }

    };

    return(

        <>

        <Navbar/>

        <div className="container page">

            <div className="narrow">

                <PageHeader
                    eyebrow="Recruiter"
                    title="Edit Job"
                    subtitle="Update the details of this listing."
                />

                <div className="form-panel">

                    <form
                    onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            <div className="full">
                                <label className="form-label">Job Title</label>
                                <input
                                className="form-control"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="full">
                                <label className="form-label">Description</label>
                                <textarea
                                className="form-control"
                                rows="5"
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="form-label">Location</label>
                                <input
                                className="form-control"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="form-label">Salary</label>
                                <input
                                className="form-control"
                                name="salary"
                                value={job.salary}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="full">
                                <label className="form-label">Company Name</label>
                                <input
                                className="form-control"
                                name="companyName"
                                value={job.companyName}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="full">
                                <label className="form-label">Skills</label>
                                <textarea
                                className="form-control"
                                rows="3"
                                name="skills"
                                value={job.skills}
                                onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="form-actions">

                            <button
                            className="btn btn-primary btn-lg"
                            >
                                Update Job
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

        </>

    );
}

export default EditJob;
