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
  TabsContent,
  TabsContentContainer,
  LoginGlobalStyle
} from './login-form-styles';
import { useDispatch, useSelector } from 'react-redux';
import { createCenterStart, loginCenterStart } from '../../store/center/center.action';
import { useNavigate } from 'react-router-dom';
import { selectCurrentCenter } from '../../store/center/center.selector';
import Swal from 'sweetalert2';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const center = useSelector(selectCurrentCenter);

  useEffect(() => {
    center && navigate('/');
  }, [center]);

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { usuario, contraseña } = loginFormData;
    dispatch(loginCenterStart({ usuario, contraseña }));
    navigate('/');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { usuario, contraseña } = registerFormData;
    dispatch(createCenterStart({ usuario, contraseña }));
    Swal.fire({
      icon: 'info',
      title: 'Procesando Registro',
      text: 'Estamos registrando el centro...',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <LoginGlobalStyle />
      <LoginContainer currentTab={currentTab}>
        <div className="form-container">
          <FormPanel>
            <Card>
              <CardHeader>
                <h2>{currentTab === 'login' ? 'Bienvenido de vuelta!' : 'Crear una cuenta'}</h2>
              </CardHeader>
              <CardContent>
                <TabsList>
                  <TabsTrigger
                    active={currentTab === 'login'}
                    onClick={() => setCurrentTab('login')}
                  >
                    Iniciar Sesion
                  </TabsTrigger>
                  <TabsTrigger
                    active={currentTab === 'register'}
                    onClick={() => setCurrentTab('register')}
                  >
                    Registrar Usuario
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent active={currentTab === 'login'}>
                  <TabsContentContainer>
                    <Label htmlFor="usuario">Usuario</Label>
                    <Input
                      id="usuario"
                      type="text"
                      name="usuario"
                      placeholder="Username"
                      value={loginFormData.usuario}
                      onChange={handleLoginChange}
                      required
                    />
                  </TabsContentContainer>
                  <TabsContentContainer>
                    <Label htmlFor="contraseña">Contraseña</Label>
                    <Input
                      id="contraseña"
                      type="password"
                      name="contraseña"
                      placeholder="Password"
                      value={loginFormData.contraseña}
                      onChange={handleLoginChange}
                      required
                    />
                  </TabsContentContainer>
                  <CardFooter>
                    <Button onClick={handleLoginSubmit}>Acceder</Button>
                  </CardFooter>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent active={currentTab === 'register'}>
                  <TabsContentContainer>
                    <Label htmlFor="centro">Hospital/Center</Label>
                    <Input
                      id="centro"
                      type="text"
                      name="usuario"
                      placeholder="Center"
                      value={registerFormData.usuario}
                      onChange={handleRegisterChange}
                      required
                    />
                  </TabsContentContainer>
                  <TabsContentContainer>
                    <Label htmlFor="contraseña">Password</Label>
                    <Input
                      id="contraseña"
                      type="password"
                      name="contraseña"
                      placeholder="Password"
                      value={registerFormData.contraseña}
                      onChange={handleRegisterChange}
                      required
                    />
                  </TabsContentContainer>
                  <CardFooter>
                    <Button onClick={handleRegisterSubmit}>Crear cuenta</Button>
                  </CardFooter>
                </TabsContent>
              </CardContent>
            </Card>
          </FormPanel>
        </div>
      </LoginContainer>
    </>
  );
};

export default LoginForm;
