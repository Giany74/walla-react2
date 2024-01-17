import PropTypes from 'prop-types';

function Footer({ className }) {
  return <footer className={className}>@2023 Gianluca Pettenon  ·.·  Keepcoding</footer>;
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
