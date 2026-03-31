import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useUser()
    const token = localStorage.getItem('task-token')
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;
