import LoginForm from '../../components/login-form/login-form-component';
import axios from 'axios';

const Login = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', formData);
      console.log('Inicio de sesión exitoso:', response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
    }
  };

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios', formData);
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};

export default Login;
