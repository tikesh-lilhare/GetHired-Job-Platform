import API from "../api/axiosConfig";

export const applyJob = (formData) => {

    return API.post(
        "/applications/apply",
        formData,
        
    );
};

export const getApplicationsByUser =
    (userId) => {

    return API.get(
        `/applications/user/${userId}`
    );
};

export const getRecommendedJobs = (applicationId) => {

    return API.get(
        `/applications/recommend-jobs/${applicationId}`
    );
};

export const getApplicantsByJob = (jobId) => {

    return API.get(
        `/applications/job/${jobId}`
    );
};

export const updateApplicationStatus =
    (applicationId, status) => {

    return API.put(

        `/applications/${applicationId}/status`,

        {
            status: status
        }
    );
};

export const getCandidateDetails = (applicationId) => {

    return API.get(
        `/applications/candidate/${applicationId}`
    );

};
export const downloadResume = (applicationId) => {

    return API.get(

        `/applications/${applicationId}/download-resume`,

        {

            responseType: "blob"

        }

    );

};
export const getSkillGap = (applicationId) => {

    return API.get(
        `/applications/${applicationId}/skill-gap`
    );

};
export const getRecruiterDashboard = (recruiterId) => {

    return API.get(
        `/applications/dashboard/${recruiterId}`
    );

};