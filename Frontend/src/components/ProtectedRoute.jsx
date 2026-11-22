import { Navigate } from "react-router-dom";

// Pages that need a signed-in user redirect to /login. Home, Login and Register stay public.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;
