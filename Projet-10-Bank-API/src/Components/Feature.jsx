
import PropTypes from 'prop-types'; // Import PropTypes
import "../assets/css/main.css";

function FeatureItem({ icon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={title + " Icon"} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Prop validation
FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureItem;



