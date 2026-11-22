import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../NavBar";
import SearchBar from "../SearchBar";
import JobCard from "../JobCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { getAllJobs } from "../services/Jobservice";


function Jobs() {

    const [searchParams] = useSearchParams();

    const [jobs, setJobs] = useState([]);

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

    const [loading, setLoading] = useState(true);

    const [authError, setAuthError] = useState(false);


    async function fetchJobs() {

        try {

            const response =
                await getAllJobs();

            setJobs(response.data);

        } catch (error) {

            console.error(
                "Error fetching jobs:",
                error
            );

            const code = error?.response?.status;
            setAuthError(code === 401 || code === 403 || !error?.response);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        fetchJobs();

    }, []);


    const term = searchTerm.toLowerCase();

    const filteredJobs = jobs.filter(

        (job) =>

            job.companyName
                ?.toLowerCase()
                .includes(term) ||

            job.title
                ?.toLowerCase()
                .includes(term) ||

            job.skills
                ?.toLowerCase()
                .includes(term)

    );

    return (

        <>

            <Navbar />

            <div className="container page">

                <PageHeader
                    eyebrow="Job board"
                    title="Available Jobs"
                    subtitle="Find a role that matches your skills and apply in a few clicks."
                >
                    <span className="pill">
                        Total Jobs : <strong>{filteredJobs.length}</strong>
                    </span>
                </PageHeader>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {

                    loading ?

                        <Loader text="Loading Jobs..." />

                        :

                        filteredJobs.length === 0 ?

                            (
                                authError && jobs.length === 0 ? (
                                    <EmptyState
                                        icon="briefcase"
                                        title="Log in to view open jobs"
                                        text="Sign in to browse all open roles and apply with your resume."
                                    >
                                        <div className="d-flex gap-2 justify-content-center flex-wrap">
                                            <Link to="/login" className="btn btn-primary">Log in</Link>
                                            <Link to="/register" className="btn btn-secondary">Create account</Link>
                                        </div>
                                    </EmptyState>
                                ) : (
                                    <EmptyState
                                        icon="search"
                                        title="No Jobs Found"
                                        text="Try a different title, company or skill."
                                    />
                                )
                            )

                            :

                            (

                                <div className="jobs-grid">

                                    {

                                        filteredJobs.map(

                                            (job) => (

                                                <JobCard
                                                    key={job.id}
                                                    job={job}
                                                />

                                            )
                                        )

                                    }

                                </div>

                            )

                }

            </div>

        </>

    );
}

export default Jobs;
