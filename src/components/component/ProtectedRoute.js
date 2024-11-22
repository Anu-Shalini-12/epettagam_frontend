import React from 'react';
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate(); 
  navigate('/')
  
  return (
    <div></div>
  );
};

export default ProtectedRoute;
