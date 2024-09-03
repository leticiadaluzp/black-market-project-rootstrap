import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Loader } from "../../component";
import { axiosInstance } from "../../component/axios/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

export function RecoverPassword (){
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendEmail, setEmailSend] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/password", {
        user: {
          email,
          "redirect_url": "http://localhost:5173/recover-password"
        }
      });
      const accessToken = response.headers['access-token'];
      const uid = response.headers['uid'];
      const client = response.headers['client'];

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('uid', uid);
      localStorage.setItem('client', client);

      setEmailSend(true)
      toast.success("Email sent successfully!", {
        autoClose: 1500,
      });
    } catch (error){
        if (error.response && error.response.status === 401) {
          setError(error.response.data.error);
        } else {
          toast.error('Failed to send email. Please try again.');
        }
    } finally {
        setIsLoading(false);
        setEmail("");
    }
  }

  if (isLoading) return <Loader />

 return(
  <>
   {sendEmail ?
   <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
    <h2 className='text-center md:mt-5 md:text-xl'>Recover password </h2>
    <div className='flex flex-col gap-4 mt-4'>
     <p className="text-center m-auto w-56">An email has been sent to "{email}" containing instructions for resetting your password.</p>
     <button  className='m-auto w-32 h-20 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' >
      <Link to='/update-password'>
        Change password
      </Link>
     </button>
    </div>
   </section> :
   <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
    <h2 className='text-center md:mt-5 md:text-xl'>Recover password </h2>
    <form onSubmit={handleSubmit} action='' className='flex flex-col'>
     <Input name='Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Write your email here!'/>
     {error && <p className="text-red-500 flex items-center w-11/12 m-auto md:pl-20">{error}</p>}
     <input type="submit" value="Send email" className='m-auto w-32 h-10 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
    </form>
   </section>
   }
  </>
 )
}
