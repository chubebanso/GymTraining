import PropTypes from "prop-types";
import "./Perform.css";

const HistoryItem = ({ workout }) => {
  return (
    <div className="history-item">
      <div>
        <img src={workout.image} alt="workout" className="item-image" />
      </div>
      <div className="item-info">
        <div className="item-info-name">
          <p>{workout.name}</p>
          <p>{workout.description}</p>
        </div>
        <div className="item-info-name">
          <p>{workout.duration}</p>
          <p>{workout.calories}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;

HistoryItem.propTypes = {
  workout: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    calories: PropTypes.string.isRequired,
  }).isRequired,
};