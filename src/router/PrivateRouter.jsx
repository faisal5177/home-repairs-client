import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location)

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signIn" state={location?.pathname}></Navigate>;
};

export default PrivateRouter;