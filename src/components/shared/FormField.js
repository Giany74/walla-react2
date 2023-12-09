import clsx from 'clsx';

import './FormField.css';

const FormField = ({ className, label, ...props }) => {
  return (
    <div className={clsx('formField', className)}>
      <label className="formField-label">
        <span>{label}</span>
        <input className="formField-input" autoComplete="off" {...props} />
      </label>
    </div>
  );
};

export default FormField;
