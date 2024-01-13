import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import { useAuth } from '../context';
import { logout } from '../service';
import ConfirmationModal from '../../../components/shared/ConfirmationModal';

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth();
  const [isLogoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogoutClick = async () => {
    setLogoutConfirmationOpen(true);
  };

  const handleCancelLogout = () => {
    setLogoutConfirmationOpen(false);
  };

  const handleConfirmLogout = async () => {
    await logout();
    onLogout();
    setLogoutConfirmationOpen(false);
  };

  return (
    <>
      {isLogged ? (
        <Button onClick={handleLogoutClick} className={className}>
          Logout
        </Button>
      ) : (
        <Button as={Link} to="/login" $variant="primary" className={className}>
          Login
        </Button>
      )}

      <ConfirmationModal
        isOpen={isLogoutConfirmationOpen}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
}

export default AuthButton;
