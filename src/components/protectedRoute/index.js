import React from "react";
import { Navigate , Route } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("sessionId");

    return isAuthenticated
    ? children
    : <Navigate to="/login" />;
    }

export default ProtectedRoute;
