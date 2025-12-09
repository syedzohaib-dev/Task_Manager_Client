import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    // loading ho to UI flash na ho
    // if (loading) {
    //     return <p className="p-5 text-center">Loading...</p>;
    // }

    // user nahi mila → login page pr bhejo
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
