


// // components/PrivateRoute.js
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
// };

// export default PrivateRoute;





import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('loggedInUser');
  const role = localStorage.getItem('role');

  if (!token || !user) {
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
