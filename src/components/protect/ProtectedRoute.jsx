import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useUser()
    const token = localStorage.getItem('task-token')
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// function parseJwt(token) {
//   try {
//     const base64Payload = token.split(".")[1]; // middle part of JWT
//     const payload = JSON.parse(atob(base64Payload)); // decode Base64
//     return payload;
//   } catch (e) {
//     return null;
//   }
// }

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("task-token");

//   // Token missing → redirect
//   if (!token) return <Navigate to="/login" replace />;

//   const decoded = parseJwt(token);

//   // Token invalid or expired → remove + redirect
//   if (!decoded || decoded.exp < Date.now() / 1000) {
//     localStorage.removeItem("task-token");
//     return <Navigate to="/login" replace />;
//   }

//   // Token valid → allow access
//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function parseJwt(token) {
//     try {
//         const base64Payload = token.split(".")[1];
//         return JSON.parse(atob(base64Payload));
//     } catch (e) {
//         return null;
//     }
// }

// const ProtectedRoute = ({ children }) => {
//     const [isValid, setIsValid] = useState(true);

//     useEffect(() => {
//         const checkToken = () => {
//             const token = localStorage.getItem("task-token");

//             if (!token) {
//                 setIsValid(false);
//                 return;
//             }

//             const decoded = parseJwt(token);

//             if (!decoded || decoded.exp < Date.now() / 1000) {
//                 localStorage.removeItem("task-token");
//                 setIsValid(false);
//             }
//         };

//         checkToken(); // initial check

//         const interval = setInterval(checkToken, 5000); // every 5 sec

//         return () => clearInterval(interval);
//     }, []);

//     if (!isValid) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;