import clsx from 'clsx';

import './Textarea.css';

const Textarea = ({ className, ...props }) => {
  return (
    <div className={clsx('textarea', className)}>
      <textarea className="textarea-input" {...props} />
    </div>
  );
};

export default Textarea;
