export const formatSalary = (salary) => {
    if (salary === null || salary === undefined || salary === "") return "Not disclosed";
    const n = Number(salary);
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : String(salary);
};

export const splitSkills = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills !== "string") return [];
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
};

export const initials = (name = "") =>
    String(name).trim().split(/\s+/).slice(0, 2).map((p) => (p[0] || "").toUpperCase()).join("") || "?";

export const prettyStatus = (status) =>
    String(status || "APPLIED").replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const statusStep = (status) => {
    switch (status) {
        case "SHORTLISTED": return 1;
        case "INTERVIEW_SCHEDULED": return 2;
        case "HIRED": return 3;
        default: return 0;
    }
};

export const statusTone = (status) => {
    switch (status) {
        case "SHORTLISTED": return "bg-warning";
        case "INTERVIEW_SCHEDULED": return "bg-info";
        case "HIRED": return "bg-success";
        case "REJECTED": return "bg-danger";
        default: return "bg-secondary";
    }
};
