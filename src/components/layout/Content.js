import PropTypes from 'prop-types';

function Content({ title, children }) {
  return (
    <>
      <h2 className="layout-title bordered">{title}</h2>
      {children}
    </>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Content;
