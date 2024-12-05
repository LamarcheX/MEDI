import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../UI/card.styles';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsContentContainer } from '../UI/tabs.styles';
import { Label } from '../UI/label.styles';
import { Input } from '../UI/input.styles';
import { Button } from '../UI/button.styles';
import { useDispatch, useSelector } from 'react-redux';
import { createCenterStart, loginCenterStart } from '../../store/center/center.action';
import { useNavigate } from 'react-router-dom';
import { selectCurrentCenter } from '../../store/center/center.selector';
import Swal from 'sweetalert2';

const LoginForm = () => {
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
    navigate("/");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { usuario, contraseña } = registerFormData;
    console.log("Datos enviados:", { usuario, contraseña });

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
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList columns={2}>
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>

            {/* Pestaña de Iniciar Sesión */}
            <TabsContent value="login" columns={1}>
                <TabsContentContainer>
                  <Label htmlFor="usuario">Centro</Label>
                  <Input
                    id='usuario'
                    type="text"
                    name="usuario"
                    placeholder="Centro"
                    value={loginFormData.usuario}
                    onChange={handleLoginChange}
                    required
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <Input
                    id='contraseña'
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={loginFormData.contraseña}
                    onChange={handleLoginChange}
                    required
                  />
                </TabsContentContainer>
                <CardFooter>
                  <Button onClick={handleLoginSubmit}>Iniciar Sesión</Button>
                </CardFooter>
            </TabsContent>

            {/* Pestaña de Registro */}
            <TabsContent value="register" columns={1}>
                <TabsContentContainer>
                  <Label htmlFor="centro">Centro/Hospital</Label>
                  <Input
                    type="text"
                    name="usuario"
                    placeholder="Centro"
                    value={registerFormData.usuario}
                    onChange={handleRegisterChange}
                    required
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <Input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={registerFormData.contraseña}
                    onChange={handleRegisterChange}
                    required
                  />
                </TabsContentContainer>
                <CardFooter>
                  <Button onClick={handleRegisterSubmit}>Crear Cuenta</Button>
                </CardFooter>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
