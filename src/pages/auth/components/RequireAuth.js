import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context';
import PropTypes from 'prop-types';

function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;