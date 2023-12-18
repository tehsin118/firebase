// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "./useAuth ";
const ProtectedRoute = ({ path, element }) => {
  const user = useAuth();

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
