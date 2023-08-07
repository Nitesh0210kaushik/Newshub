
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedComponent = () => {
  const isLoggedIn = Cookies.get('isLoggedIn'); // Use the same cookie key

  return isLoggedIn ? <Outlet /> : <Navigate to="signup" />;
};

export default ProtectedComponent;


