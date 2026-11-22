import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavBar";
import PageHeader from "../components/PageHeader";
import {
    getProfile,
    updateProfile
} from "../services/userService";
import toast from "../utils/toast";

function EditProfile(){

    const {id}=useParams();

    const navigate=useNavigate();

    const [form,setForm]=useState({

        name:"",
        phone:"",
        location:"",
        education:"",
        experience:"",
        skills:"",
        about:""

    });


    async function loadProfile() {

        try{

            const response=
                await getProfile(id);

            setForm(response.data);

        }
        catch(error){

            console.log(error);

            toast.error("Failed to load profile");
        }

    }

    useEffect(()=>{

        loadProfile();

    },[]);


    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await updateProfile(id,form);

            toast.success("Profile updated successfully");

            navigate("/profile");

        }
        catch(error){

            console.log(error);

            toast.error("Update failed");

        }

    };

    return(

        <>

        <Navbar/>

        <div className="container page">

            <div className="narrow">

                <PageHeader
                    eyebrow="Account"
                    title="Edit Profile"
                    subtitle="Keep your details and skills up to date so recruiters and recommendations stay accurate."
                />

                <div className="form-panel">

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="full">
                                <label className="form-label" htmlFor="ep-name">Name</label>
                                <input
                                id="ep-name"
                                className="form-control"
                                name="name"
                                value={form.name ?? ""}
                                onChange={handleChange}
                                placeholder="Name"
                                />
                            </div>

                            <div>
                                <label className="form-label" htmlFor="ep-phone">Phone</label>
                                <input
                                id="ep-phone"
                                className="form-control"
                                name="phone"
                                value={form.phone ?? ""}
                                onChange={handleChange}
                                placeholder="Phone"
                                />
                            </div>

                            <div>
                                <label className="form-label" htmlFor="ep-location">Location</label>
                                <input
                                id="ep-location"
                                className="form-control"
                                name="location"
                                value={form.location ?? ""}
                                onChange={handleChange}
                                placeholder="Location"
                                />
                            </div>

                            <div>
                                <label className="form-label" htmlFor="ep-edu">Education</label>
                                <input
                                id="ep-edu"
                                className="form-control"
                                name="education"
                                value={form.education ?? ""}
                                onChange={handleChange}
                                placeholder="Education"
                                />
                            </div>

                            <div>
                                <label className="form-label" htmlFor="ep-exp">Experience</label>
                                <input
                                id="ep-exp"
                                className="form-control"
                                name="experience"
                                value={form.experience ?? ""}
                                onChange={handleChange}
                                placeholder="Experience"
                                />
                            </div>

                            <div className="full">
                                <label className="form-label" htmlFor="ep-skills">Skills</label>
                                <textarea
                                id="ep-skills"
                                className="form-control"
                                rows="3"
                                name="skills"
                                value={form.skills ?? ""}
                                onChange={handleChange}
                                placeholder="Skills (comma separated)"
                                />
                            </div>

                            <div className="full">
                                <label className="form-label" htmlFor="ep-about">About</label>
                                <textarea
                                id="ep-about"
                                className="form-control"
                                rows="5"
                                name="about"
                                value={form.about ?? ""}
                                onChange={handleChange}
                                placeholder="About Yourself"
                                />
                            </div>

                        </div>

                        <div className="form-actions">

                            <button
                            className="btn btn-primary btn-lg"
                            >
                                Update Profile
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

        </>

    );
}

export default EditProfile;
