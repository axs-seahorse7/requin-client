import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../api";

const ProtectedRoute = ({ allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get("/protected");
        console.log("User data:", res.data);
        const userRole = res.data.user.role;

        if (allowedRoles.includes(userRole)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [allowedRoles]);

  if (loading) return <p>Checking access...</p>;

  if (!isAuthorized) return <Navigate to="/login" />;

  return <Outlet/>;
};

export default ProtectedRoute;