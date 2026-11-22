import { Link } from "react-router-dom";
import Navbar from "../NavBar";

function NotFound() {
    return (
        <>
            <Navbar />
            <div className="container nf">
                <div className="big">4<span>0</span>4</div>
                <h2 className="mt-3">This page took a day off.</h2>
                <p className="text-muted mt-2 mb-4">The page you’re looking for doesn’t exist or has moved.</p>
                <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
            </div>
        </>
    );
}

export default NotFound;
