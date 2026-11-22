import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getProfile } from "../services/userService";
import { initials, splitSkills } from "../utils/format";
import toast from "../utils/toast";

function Profile() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");


    async function fetchProfile() {

        try {

            const response =
                await getProfile(userId);

            setUser(response.data);

        }
        catch(error){

            console.log(error);

            toast.error("Failed to load profile");

        }
        finally{

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchProfile();

    }, []);


    if(loading){

        return (

            <>
                <Navbar/>

                <div className="container page">
                    <Loader text="Loading Profile..." />
                </div>
            </>

        );
    }

    if(!user){

        return (

            <>
                <Navbar/>

                <div className="container page">
                    <EmptyState icon="user" title="Profile not available" text="We couldn’t load your profile. Please try again in a moment." />
                </div>
            </>

        );
    }

    const details = [
        { label: "Email", value: user.email, icon: "mail" },
        { label: "Phone", value: user.phone, icon: "phone" },
        { label: "Location", value: user.location, icon: "pin" },
        { label: "Education", value: user.education, icon: "graduation" },
        { label: "Experience", value: user.experience, icon: "award" },
    ];

    return(

        <>

            <Navbar/>

            <div className="container page">

                <div className="profile-hero">

                    <div className="profile-banner" />

                    <div className="profile-body">

                        <span className="avatar-xl">{initials(user.name)}</span>

                        <div className="grow">
                            <h1>{user.name}</h1>
                            <span className="badge bg-primary">
                                {user.role}
                            </span>
                        </div>

                        <Link
                            to={`/edit-profile/${user.id}`}
                            className="btn btn-primary"
                        >
                            <Icon name="edit" size={16} />
                            Edit Profile
                        </Link>

                    </div>

                </div>

                <div className="row g-4">

                    <div className="col-lg-7">

                        <div className="panel">

                            <h2>Details</h2>

                            <div className="info-grid">

                                {details.map((d) => (
                                    <div className="info-item" key={d.label}>
                                        <span className="icon-tile soft sm"><Icon name={d.icon} size={18} /></span>
                                        <div>
                                            <small>{d.label}</small>
                                            <span>{d.value || "—"}</span>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-5">

                        <div className="d-grid gap-4">

                            <div className="panel">

                                <h2>Skills</h2>

                                {splitSkills(user.skills).length > 0 ? (
                                    <div className="skill-row mb-0">
                                        {splitSkills(user.skills).map((s, i) => (
                                            <span className="skill" key={i}>{s}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No skills added yet.</p>
                                )}

                            </div>

                            <div className="panel">

                                <h2>About</h2>

                                <p className="rich">{user.about || "Nothing here yet."}</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default Profile;
