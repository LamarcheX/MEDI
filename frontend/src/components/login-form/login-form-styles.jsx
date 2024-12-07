
import styled, { createGlobalStyle } from 'styled-components';
export const LoginGlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("https://pastoraldelasaludrd.com/images/Foto%20Cientos%20de%20personas%20marcharon%20en%20la%20Caminata%20Un%20Paso%20por%20la%20Salud%20Mental%202024%201.jpg#joomlaImage://local-images/Foto%20Cientos%20de%20personas%20marcharon%20en%20la%20Caminata%20Un%20Paso%20por%20la%20Salud%20Mental%202024%201.jpg?width=4928&height=3264");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
     position: relative;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .form-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 0;
  }

  .tabs-container {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 2;
    display: flex;
    gap: 20px;
  }

  .tabs-container button {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .tabs-container button:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;



export const FormPanel = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9); /* Mayor opacidad */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Sombra más definida */
  height: 100%; /* Cubrir todo el lado vertical */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const CardFooter = styled.div`
  padding: 20px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TabsList = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TabsTrigger = styled.button`
  flex: 1;
  padding: 10px;
  background: ${({ active }) => (active ? '#007bff' : '#ccc')};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const TabsContent = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

export const TabsContentContainer = styled.div`
  margin-bottom: 20px;
`;
