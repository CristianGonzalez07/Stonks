import Wave from '../components/backgroundWave';
import { Navigate } from 'react-router-dom';
import { Form } from '../components/index';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import axios from "axios";


const inputs = [
  {
    type: "text",
    id: "username",
    label: "Usuario"
  },
  {
    type: "password",
    id: "password",
    label: "Contraseña"
  }
];

const LoginPage = () => {
  const { user, login } = useAuth();
  const [ error, setError] = useState<boolean>(false);

  const userAuth = async (data: any) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/login?username=${data.username}&password=${data.password}`);
      const responseData = response.data;
      if (responseData.login === "Error") {
        setError(true);
      } else {
        login(responseData);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  return (
    !user ? (
        <div>
          <Wave>
            <Form
              inputs={inputs}
              onSubmit={userAuth}
              buttonText='Ingresar'
              isLoading={false}
              error={error}
            />
          </Wave>
      </div>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default LoginPage;
