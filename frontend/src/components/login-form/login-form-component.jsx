import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../UI/card.styles';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsContentContainer } from '../UI/tabs.styles';
import { Label } from '../UI/label.styles';
import { Input } from '../UI/input.styles';
import { Button } from '../UI/button.styles';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    centro: '',
    contraseña: '',
  });
  const [activeTab, setActiveTab] = useState('login'); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList>
              <TabsTrigger value="login" onClick={() => setActiveTab('login')}>Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register" onClick={() => setActiveTab('register')}>Registro</TabsTrigger>
            </TabsList>

            {/* Pestaña de Iniciar Sesión */}
            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
                <TabsContentContainer>
                  <Label htmlFor="centro">Centro</Label>
                  <Input
                    type="text"
                    name="centro"
                    placeholder="Centro"
                    value={formData.centro}
                    onChange={handleChange}
                    required
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <Input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                  />
                </TabsContentContainer>
                <CardFooter>
                  <Button type="submit">Iniciar Sesión</Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Pestaña de Registro */}
            <TabsContent value="register">
              <form onSubmit={handleSubmit}>
                <TabsContentContainer>
                  <Label htmlFor="centro">Centro/Hospital</Label>
                  <Input
                    type="text"
                    name="centro"
                    placeholder="Centro"
                    value={formData.centro}
                    onChange={handleChange}
                    required
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="contraseña">Contraseña</Label>
                  <Input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                  />
                </TabsContentContainer>
                <CardFooter>
                  <Button type="submit">Crear Cuenta</Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;