import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context';

function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default RequireAuth;