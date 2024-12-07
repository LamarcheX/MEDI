import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.route';
import Home from './routes/home/home.route';
import Login from './routes/Login/login.route';
import ProtectedRoute from './components/protected-routes/protected-routes'; 
import MedicalHistory from './routes/medical-history/medical-history.route';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCenter } from './store/center/center.selector';
import { useEffect } from 'react';
import { checkCenterSessionStart } from './store/center/center.action';

function App() {
  const center = useSelector(selectCurrentCenter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (center) {
      dispatch(checkCenterSessionStart());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
      <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/medical-history'
          element={
            <ProtectedRoute>
              <MedicalHistory />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
