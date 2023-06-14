import {  Navigate } from 'react-router-dom'
import { Form } from '../components/index'
import { useAuth } from '../hooks/useAuth';
import axios from "axios";

const inputs = [
  {
    type:"text",
    label:"username",
    error:<p className="text-red-600 text-xs font-bold mt-2">This field is required*</p>,
  },
  {
    type:"password",
    label:"password",
    error:<p className="text-red-600 text-xs font-bold mt-2">This field is required*</p>,
  }
];


const LoginPage = () => {
  const { user, login } = useAuth();
  const userAuth = async (data:any) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/login?username=${data.username}&password=${data.password}`)
    console.log({response})
    const responseData = response.data;

    if (responseData.login === "Error") {
      console.error("error", "Error al iniciar sesión, revisa tus datos e intenta nuevamente");
    } else {
      console.error("success", "Sesión iniciada correctamente!");
      login(responseData);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de inicio de sesión:", error);
    console.error("error", "Error al iniciar sesión, por favor intenta nuevamente");
  }
}
  return (
    !user ?
      <div className='w-full h-full flex justify-center items-center'>
        <div className="w-[50%] h-[70%]">
          <Form 
            inputs={inputs} 
            onSubmit={userAuth}
            buttonText='Login'
            isLoading={false}
          />
        </div>
      </div>
    : <Navigate to="/"/>
  )
}

export default LoginPage