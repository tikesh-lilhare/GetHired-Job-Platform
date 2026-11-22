import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../NavBar";
import Icon from "../components/Icon";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ScoreRing from "../components/ScoreRing";
import StatusBadge from "../components/StatusBadge";
import {
    getCandidateDetails,
    downloadResume,
    getSkillGap
} from "../services/applicationService";
import { initials } from "../utils/format";
import toast from "../utils/toast";

function CandidateDetails() {

  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  const [skillGap, setSkillGap] = useState(null);

  const [loading, setLoading] = useState(true);


  async function loadCandidate() {

    try {

      const response = await getCandidateDetails(id);

      setCandidate(response.data);

      const gapResponse =
          await getSkillGap(
              response.data.applicationId
          );

      setSkillGap(
          gapResponse.data
      );

    } catch (e) {

      console.error(e);

      toast.error("Failed to load candidate details");

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => { loadCandidate(); }, []);


  const handleDownload = async () => {

        try {

            const response =
                await downloadResume(
                    candidate.applicationId
                );

                console.log(response.data);

            const file = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const fileURL =
                window.URL.createObjectURL(file);

            const link =
                document.createElement("a");

            link.href = fileURL;

            link.download = "Resume.pdf";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(fileURL);

        } catch (error) {

            console.log(error);

            toast.error("Resume download failed");

        }

    };

  if (loading) return (

    <>
      <Navbar />
      <div className="container page">
        <Loader text="Loading Candidate..." />
      </div>
    </>

  );

  if (!candidate) return (

    <>
      <Navbar />
      <div className="container page">
        <EmptyState icon="users" title="Candidate details not found." text="The application may have been removed.">
          <Link to="/view-applicants" className="btn btn-primary">Back to applicants</Link>
        </EmptyState>
      </div>
    </>

  );

  const details = [
    { label: "Name", value: candidate.name, icon: "user" },
    { label: "Email", value: candidate.email, icon: "mail" },
    { label: "Phone", value: candidate.phone || "N/A", icon: "phone" },
    { label: "Location", value: candidate.location || "N/A", icon: "pin" },
    { label: "Education", value: candidate.education || "N/A", icon: "graduation" },
    { label: "Experience", value: candidate.experience || "N/A", icon: "award" },
    { label: "Skills", value: candidate.skills || "N/A", icon: "layers" },
    { label: "About", value: candidate.about || "N/A", icon: "info" },
  ];

  return (

    <>

      <Navbar />

      <div className="container page">

        <Link to="/view-applicants" className="btn btn-ghost btn-sm mb-3">
          <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Back to applicants
        </Link>

        <div className="profile-hero">

          <div className="profile-banner" />

          <div className="profile-body">

            <span className="avatar-xl">{initials(candidate.name)}</span>

            <div className="grow">
              <h1>{candidate.name}</h1>
              <StatusBadge status={candidate.status} />
            </div>

            {candidate.resumeUrl ? (
                <button
                    className="btn btn-primary"
                    onClick={handleDownload}
                >
                    <Icon name="download" size={16} />
                    Download Resume
                </button>
            ) : (
                <button
                    className="btn btn-secondary"
                    disabled
                >
                    Resume Not Available
                </button>
            )}

          </div>

        </div>

        <div className="row g-4">

          <div className="col-lg-7">

            <div className="panel">

              <h2>Candidate Details</h2>

              <div className="info-grid">

                {details.map((d) => (
                  <div className={`info-item${d.label === "About" || d.label === "Skills" ? " full" : ""}`} key={d.label}>
                    <span className="icon-tile soft sm"><Icon name={d.icon} size={18} /></span>
                    <div>
                      <small>{d.label}</small>
                      <span>{d.value}</span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="d-grid gap-4">

              <div className="panel">

                <h2>Match Score</h2>

                <div className="score-wrap">

                  <ScoreRing value={candidate.matchScore || 0} />

                  <div className="flex-grow-1">
                    <div className="display-6 fw-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                      {candidate.matchScore?.toFixed(2)}%
                    </div>
                    <div className="progress mt-2">
                      <div className="progress-bar" style={{width: `${candidate.matchScore || 0}%`}}>
                        {candidate.matchScore?.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div className="panel">

                <h2>Resume Skills</h2>

                {candidate.resumeSkills?.length ? (
                  <div className="skill-row mb-0">
                    {candidate.resumeSkills.map((s,i)=>(
                      <span key={i} className="skill">{s}</span>
                    ))}
                  </div>
                ) : <p className="text-muted">No Skills Found</p>}

              </div>

            </div>

          </div>

        </div>

        <div className="panel dark mt-4">

          <h2 className="d-flex align-items-center gap-2">
            <Icon name="sparkles" size={22} style={{ color: "var(--lime)" }} />
            AI Skill Gap Analysis
          </h2>

          {
              skillGap ? (

                  <div className="bg-white rounded-4 p-4 text-dark">

                      <h5 className="text-primary mb-4">
                          Match Percentage :
                          {" "}
                          {skillGap.matchPercentage.toFixed(2)}%
                      </h5>

                      <div className="gap-cols">

                          <div>
                              <h6 className="sub-h mt-0">Matched Skills</h6>
                              <div className="skill-row mb-0">
                                  {
                                      skillGap.matchedSkills.map(
                                          (skill,index)=>(
                                              <span
                                                  key={index}
                                                  className="skill ok"
                                              >
                                                  {skill}
                                              </span>
                                          )
                                      )
                                  }
                              </div>
                          </div>

                          <div>
                              <h6 className="sub-h mt-0">Missing Skills</h6>
                              <div className="skill-row mb-0">
                                  {
                                      skillGap.missingSkills.length>0 ?
                                          skillGap.missingSkills.map(
                                              (skill,index)=>(
                                                  <span
                                                      key={index}
                                                      className="skill miss"
                                                  >
                                                      {skill}
                                                  </span>
                                              )
                                          )
                                          :
                                          <span className="skill ok">
                                              No Missing Skills
                                          </span>
                                  }
                              </div>
                          </div>

                      </div>

                      <div className="gap-cols mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>

                          <div>
                              <h6 className="sub-h mt-0">Required Skills</h6>
                              <div className="skill-row mb-0">
                                  {
                                      skillGap.requiredSkills.map(
                                          (skill,index)=>(
                                              <span
                                                  key={index}
                                                  className="skill"
                                              >
                                                  {skill}
                                              </span>
                                          )
                                      )
                                  }
                              </div>
                          </div>

                          <div>
                              <h6 className="sub-h mt-0">Resume Skills</h6>
                              <div className="skill-row mb-0">
                                  {
                                      skillGap.resumeSkills.map(
                                          (skill,index)=>(
                                              <span
                                                  key={index}
                                                  className="skill neutral"
                                              >
                                                  {skill}
                                              </span>
                                          )
                                      )
                                  }
                              </div>
                          </div>

                      </div>

                  </div>

              ) : (
                  <p style={{ color: "rgba(255,255,255,.7)" }}>Skill gap analysis is not available for this application.</p>
              )
          }

        </div>

      </div>

    </>

  );
}

export default CandidateDetails;
