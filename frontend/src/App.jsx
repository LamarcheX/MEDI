import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.route';
import Home from './routes/home/home.route';
import Login from './routes/Login/login.route';
import ProtectedRoute from './components/protected-routes/protected-routes'; 
import './App.css';

function App() {

  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
