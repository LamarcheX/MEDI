import { useState, useEffect } from 'react';
import {
  LoginContainer,
  FormPanel,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Label,
  Input,
  Button,
  TabsList,
  TabsTrigger,
  TabsContentContainer,
  LoginGlobalStyle,
} from './login-form-styles';
import { useDispatch, useSelector } from 'react-redux';
import { createCenterStart, loginCenterStart } from '../../store/center/center.action';
import { useNavigate } from 'react-router-dom';
import { selectCurrentCenter } from '../../store/center/center.selector';
import Swal from 'sweetalert2';
import TripleSpinner from '../UI/triple-spinner.styles';

const LoginForm = () => {
  const [currentTab, setCurrentTab] = useState('login');
  const [loginFormData, setLoginFormData] = useState({
    usuario: '',
    contraseña: '',
  });

  const [registerFormData, setRegisterFormData] = useState({
    usuario: '',
    contraseña: '',
  });

  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const center = useSelector(selectCurrentCenter);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    if (center) {
      setIsLoading(false); 
      navigate('/');
    }
  }, [center, navigate]);

  
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonText: 'Entendido',
      });
      setError(null);
    }
  }, [error]);

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
   
    const { usuario, contraseña } = loginFormData;

    try {
      dispatch(loginCenterStart({ usuario, contraseña }));
      
    } catch (err) {
      setError('Usuario o contraseña incorrectos. Por favor, intente de nuevo.');
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const { usuario, contraseña } = registerFormData;

    try {
      dispatch(createCenterStart({ usuario, contraseña }));
      Swal.fire({
        icon: 'info',
        title: 'Procesando Registro',
        text: 'Estamos registrando el centro...',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setError('No se pudo completar el registro. Inténtelo de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginGlobalStyle />
      {isLoading ? (
        <TripleSpinner />
      ) : (
        <LoginContainer $currentTab={currentTab}>
          <div className="form-container">
            <FormPanel>
              <Card>
                <CardHeader>
                  <h2>{currentTab === 'login' ? 'Bienvenido de vuelta!' : 'Crear una cuenta'}</h2>
                </CardHeader>
                <CardContent>
                  <TabsList>
                    <TabsTrigger
                      $active={currentTab === 'login'}
                      onClick={() => setCurrentTab('login')}
                    >
                      Iniciar Sesión
                    </TabsTrigger>
                    <TabsTrigger
                      $active={currentTab === 'register'}
                      onClick={() => setCurrentTab('register')}
                    >
                      Registrar Usuario
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  {currentTab === 'login' && (
                    <form onSubmit={handleLoginSubmit}>
                      <TabsContentContainer>
                        <Label htmlFor="login-usuario">Usuario</Label>
                        <Input
                          id="login-usuario"
                          type="text"
                          name="usuario"
                          placeholder="Username"
                          value={loginFormData.usuario}
                          onChange={handleLoginChange}
                          required
                        />
                      </TabsContentContainer>
                      <TabsContentContainer>
                        <Label htmlFor="login-contraseña">Contraseña</Label>
                        <Input
                          id="login-contraseña"
                          type="password"
                          name="contraseña"
                          placeholder="Password"
                          value={loginFormData.contraseña}
                          onChange={handleLoginChange}
                          required
                        />
                      </TabsContentContainer>
                      <CardFooter>
                        <Button type="submit">Acceder</Button>
                      </CardFooter>
                    </form>
                  )}

                  {/* Register Tab */}
                  {currentTab === 'register' && (
                    <form onSubmit={handleRegisterSubmit}>
                      <TabsContentContainer>
                        <Label htmlFor="register-usuario">Hospital/Center</Label>
                        <Input
                          id="register-usuario"
                          type="text"
                          name="usuario"
                          placeholder="Center"
                          value={registerFormData.usuario}
                          onChange={handleRegisterChange}
                          required
                        />
                      </TabsContentContainer>
                      <TabsContentContainer>
                        <Label htmlFor="register-contraseña">Password</Label>
                        <Input
                          id="register-contraseña"
                          type="password"
                          name="contraseña"
                          placeholder="Password"
                          value={registerFormData.contraseña}
                          onChange={handleRegisterChange}
                          required
                        />
                      </TabsContentContainer>
                      <CardFooter>
                        <Button type="submit">Crear cuenta</Button>
                      </CardFooter>
                    </form>
                  )}
                </CardContent>
              </Card>
            </FormPanel>
          </div>
        </LoginContainer>
      )}
    </>
  );
};

export default LoginForm;
