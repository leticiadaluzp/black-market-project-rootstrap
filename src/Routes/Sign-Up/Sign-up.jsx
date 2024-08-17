import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Loader } from "../../component";
import { axiosInstance } from "../../component/axios/axios";

export function SignUp(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState([]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users", {
        user: {
          email,
          name,
          password,
          password_confirmation: confirmPassword
        }
      });
      console.log("User registration successful:", response);
      //TO DO: mostrar mensaje de registro exitoso y luego esperar x segundos para dirigir al sign in
      navigate("/SignIn");
    } catch (error){
        if (error.response && error.response.status === 422) {
            setGeneralError(error.response.data.errors.full_messages);
        } else {
            setGeneralError("An unexpected error occurred.");
        }
    } finally {
        setIsLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }
  };

  if (isLoading) return <Loader />
  
  return (
    <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
      <h2 className='text-center md:mt-5 md:text-xl'>Sign Up </h2>
      <form onSubmit={handleSubmit} action='' className='flex flex-col'>
        <Input name='Email' id='email' type='email' placeholder='Write your email here!' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input name='Name' id='name' type='text' placeholder='Write your name here!' value={name} onChange={(e) => setName(e.target.value)}/> 
        <Input name='Password' id='password' type='password' placeholder='Write your password here!' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input name='Confirm your password' id='password-confirm' type='password' placeholder='Confirm your password here!' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        
        <div className='flex items-center mb-4 w-11/12 m-auto md:pl-20'>
          <input type='checkbox' required className='form-checkbox mr-2 ' />
          <span className=''>Accept terms and conditions</span>
        </div>
        
        {generalError.length > 0 && generalError.map((error, index) => (
          <p key={index} className="text-red-500 flex items-center w-11/12 m-auto md:pl-20">• {error}</p>
        ))}
        
        <input type="submit" value="Create account" className='m-auto w-40 h-10 mt-4 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
      </form>

    </section>
  )
}
