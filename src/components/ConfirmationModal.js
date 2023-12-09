import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
