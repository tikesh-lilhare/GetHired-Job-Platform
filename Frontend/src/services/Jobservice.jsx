import API from "../api/axiosConfig";

export const getAllJobs = () => {

    return API.get("/jobs/all");
};

export const getJobById = (id) => {

    return API.get(`/jobs/${id}`);
};

export const searchJobs = (company) => {

    return API.get(
        `/jobs/search/company?company=${company}`
    );
};

export const createJob = (jobData) => {

    return API.post(
        "/jobs",
        jobData
    );
};


export const getRecruiterJobs = (recruiterId) => {

    return API.get(
        `/jobs/recruiter/${recruiterId}`
    );

};

export const updateJob = (id, job) => {

    return API.put(
        `/jobs/${id}`,
        job
    );

};

export const deleteJob = (id) => {

    return API.delete(
        `/jobs/${id}`
    );

};