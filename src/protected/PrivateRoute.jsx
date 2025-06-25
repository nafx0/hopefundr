import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !user.email)) {
      setShowAlert(true);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (showAlert) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You must be logged in to access this page.",
    });
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;