import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentCenter } from '../../store/center/center.selector';

const ProtectedRoute = ({ children }) => {
  const center = useSelector(selectCurrentCenter) ? true : false;
  return center ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
