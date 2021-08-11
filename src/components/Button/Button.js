import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <div className="Button_container">
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
