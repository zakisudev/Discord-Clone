import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
