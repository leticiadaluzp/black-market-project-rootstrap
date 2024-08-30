import { Link } from 'react-router-dom';
import { useContext } from "react";
import { ItemMenu } from '../index.js';
import { UserSessionContext } from '../context/UserSessionProvider';
import logo from '../../assets/logo.png';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { axiosInstance } from "../../component/axios/axios";

export function Header() {
  const { isLoggedIn, setIsLoggedIn} = useContext(UserSessionContext);

  const removeAuth = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    setIsLoggedIn(false);
  };

  const logOut = async () => {
    try {
      const response = await axiosInstance.delete('/users/sign_out', {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      });
      if (response.data.success) {
        removeAuth();
        toast.success('Successfully signed out.', {
          autoClose: 1500,
        });
      } else {
        toast.error('Failed to sign out. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('User was not found or was not logged in.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const authLinks = (
    <ul className='flex md:pr-0.25 gap-[6px] md:gap-2 box-border'>
      <ItemMenu text='Homepage' path='homepage' icon='home' permit='auth' />
      <ItemMenu text='Shopping cart' path='shopping-cart' icon='cart'  permit='auth' />
      <ItemMenu text='Sign Out' path='/' onClick={logOut} icon='logOut'  permit='auth' />
    </ul>
  );

  const guestLinks = (
    <ul className='flex md:pr-0.25 md:gap-2 box-border'>
      <ItemMenu text='Sign In' path='SignIn' permit='guest' />
      <ItemMenu text='Sign Up' path='SignUp' permit='guest' />
    </ul>
  );

  return (
    <>
      <ToastContainer />
      <header className='flex box-border justify-between w-full h-10 py-0.5 px-2.5 md:h-16 md:py-0 md:px-[10%] md:shadow-extra'>
        <div>
          <Link to={isLoggedIn ? 'homepage' : '/' } className='flex items-center pl-0.25 gap-1 pt-2 md:pt-4'>
            <img src={logo} alt="logo" className='w-8 h-8' />
            <h1 className='font-logo text-sm md:text-lg'>Black Market</h1>
          </Link>
        </div>
        {isLoggedIn ? authLinks : guestLinks}
      </header>
    </>
  )
}
