import React from 'react';
import Button from './Button';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px' }}>
        <p>{message}</p>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} $variant="primary">
          Confirm
        </Button>

      </div>
    </div>
  );
};

export default ConfirmationModal;
