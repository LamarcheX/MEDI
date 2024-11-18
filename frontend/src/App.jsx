import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.route';
import Home from './routes/home/home.route';
import Login from './routes/Login/login.route';
import ProtectedRoute from './components/protected-routes/protected-routes'; 
import './App.css';
import HistoriaClinica from './components/medical-history/medical-history.component';

function App() {

  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          index
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/medical-history'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HistoriaClinica />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
