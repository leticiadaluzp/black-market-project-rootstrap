import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Loader } from "../../component";
import { axiosInstance } from "../../component/axios/axios";
import { UserSessionContext } from "../../component/context/UserSessionProvider";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

export function SignIn (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserSessionContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/sign_in", {
        user: {
          email,
          password,
        }
      });
      const accessToken = response.headers['access-token'];
      const uid = response.headers['uid'];
      const client = response.headers['client'];
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('uid', uid);
      localStorage.setItem('client', client);

      setIsLoggedIn(true);
      toast.success("User login successful!", {
        autoClose: 1500, 
      });
      navigate("/homepage");
    } catch (error){
        if (error.response && error.response.status === 401) {
          setError(error.response.data.error);
        } else {
          toast.error('Failed to sign in. Please try again.');
        }
    } finally {
        setIsLoading(false);
        setEmail("");
        setPassword("");
    }
  };

  if (isLoading) return <Loader />

  return (
    <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
      <h2 className='text-center md:mt-5 md:text-xl'>Sign In </h2>
      <form onSubmit={handleSubmit} action='' className='flex flex-col'>
        <Input name='Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Write your email here!'/>
        <Input name='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Write your password here!'/>
        {error && <p className="text-red-500 flex items-center w-11/12 m-auto md:pl-20">{error}</p>}       
        <input type="submit" value="Sign in" className='m-auto w-32 h-10 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
      </form>
      <div className='flex flex-col items-center gap-1 mt-6'>
        <small>Don't you have an account?</small>
        <small>Click here and get a new one!</small>
      </div>
    </section>
  )
}
