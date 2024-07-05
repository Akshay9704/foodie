import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    window.alert("Please login first");
    return <Navigate to="/" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

