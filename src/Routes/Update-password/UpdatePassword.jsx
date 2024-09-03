import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Loader } from "../../component";
import { axiosInstance } from "../../component/axios/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

export function UpdatePassword (){
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.put("/users/password", {
        user: {
          password,
          "password_confirmation": confirmPassword
        }
      });
      const accessToken = response.headers['access-token'];
      const uid = response.headers['uid'];
      const client = response.headers['client'];

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('uid', uid);
      localStorage.setItem('client', client);

      toast.success("Password updated successfully!", {
        autoClose: 1500,
      });
      navigate("/sign-in");
    } catch (error){
        if (error.response && error.response.status === 401) {
          setError(error.response.data.error);
        } else {
          toast.error('Failed to send email. Please try again.');
        }
    } finally {
        setIsLoading(false);
        setPassword("")
        setConfirmPassword("")
    }
  }

  if (isLoading) return <Loader />

 return(
   <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
    <h2 className='text-center md:mt-5 md:text-xl'>Recover password </h2>
    <form onSubmit={handleSubmit} action='' className='flex flex-col'>
     <Input name='Password' id='password' type='password' placeholder='Write your password here!' value={password} onChange={(e) => setPassword(e.target.value)}/>
     <Input name='Confirm your password' id='password-confirm' type='password' placeholder='Confirm your password here!' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
     {error && <p className="text-red-500 flex items-center w-11/12 m-auto md:pl-20">{error}</p>}
     <input type="submit" value="Update password" className='m-auto text-wrap w-32 h-20 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
    </form>
   </section>
 )
}