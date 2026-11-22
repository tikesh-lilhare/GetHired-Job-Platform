import { BrowserRouter,
         Routes,
         Route } from
         "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import RecommendedJobs from "./pages/RecommendedJobs";
import CreateJob from "./pages/CreateJob";
import ViewApplicants from "./pages/ViewApplicants";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import CandidateDetails from "./pages/CandidateDetails";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const secured = (page) => <ProtectedRoute>{page}</ProtectedRoute>;

function App() {

    return (

        <BrowserRouter>

            <div className="app-shell">

                <Routes>

                    {/* Public pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />

                    {/* Signed-in pages */}
                    <Route path="/dashboard" element={secured(<Dashboard />)} />
                    <Route path="/apply/:id" element={secured(<ApplyJob />)} />
                    <Route path="/my-applications" element={secured(<MyApplications />)} />
                    <Route path="/recommended-jobs" element={secured(<RecommendedJobs />)} />
                    <Route path="/create-job" element={secured(<CreateJob />)} />
                    <Route path="/view-applicants" element={secured(<ViewApplicants />)} />
                    <Route path="/profile" element={secured(<Profile />)} />
                    <Route path="/edit-profile/:id" element={secured(<EditProfile />)} />
                    <Route path="/manage-jobs" element={secured(<ManageJobs />)} />
                    <Route path="/edit-job/:id" element={secured(<EditJob />)} />
                    <Route path="/candidate/:id" element={secured(<CandidateDetails />)} />
                    <Route path="/recruiter-dashboard" element={secured(<RecruiterDashboard />)} />

                    <Route path="*" element={<NotFound />} />

                </Routes>

                <Footer />

            </div>

        </BrowserRouter>
    );
}

export default App;
