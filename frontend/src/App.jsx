import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.route';
import Home from './routes/home/home.route';
import Login from './routes/Login/login.route';
import ProtectedRoute from './components/protected-routes/protected-routes'; 
import MedicalHistory from './routes/medical-history/medical-history.route';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
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
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
