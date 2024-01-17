import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ isOpen, onCancel, onConfirm, message }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen) {
      const timerId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [isOpen]);

  return (
    <div style={{ display: isVisible ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px' }}>
        <p>{message}</p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string.isRequired,
};

export default Toast;
