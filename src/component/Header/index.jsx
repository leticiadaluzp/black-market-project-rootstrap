import { Link } from 'react-router-dom';
import { useContext } from "react";
import { ItemMenu } from '../index.js';
import { UserSessionContext } from '../context/UserSessionProvider';
import logo from '../../assets/logo.png';
import { ToastContainer } from 'react-toastify';

export function Header() {
  const { isLoggedIn, setIsLoggedIn} = useContext(UserSessionContext);

  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    setIsLoggedIn(false);
  };

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <header className='flex box-border justify-between w-full h-10 py-0.5 px-2.5 md:h-16 md:py-0 md:px-[10%] md:shadow-extra'>
          <div>
            <Link to={'/'} className='flex items-center pl-0.25 gap-1 pt-2 md:pt-4'>
              <img src={logo} alt="logo" className='w-8 h-8' />
              <h1 className='font-logo text-sm md:text-lg'>Black Market</h1>
            </Link>
          </div>
          <ul className='flex md:pr-0.25  md:gap-2 box-border'>
            <ItemMenu text='Sign Out' path='/' onClick={logOut}/>
          </ul>
        </header>
        ) : (
          <header className='flex box-border justify-between w-full h-10 py-0.5 px-2.5 md:h-16 md:py-0 md:px-[10%] md:shadow-extra'>
          <div>
            <Link to={'/'} className='flex items-center pl-0.25 gap-1 pt-2 md:pt-4'>
              <img src={logo} alt="logo" className='w-8 h-8' />
              <h1 className='font-logo text-sm md:text-lg'>Black Market</h1>
            </Link>
          </div>
          <ul className='flex md:pr-0.25  md:gap-2 box-border'>
            <ItemMenu text='Sign In' path='SignIn'/>
            <ItemMenu text='Sign Up' path='SignUp'/>
          </ul>
        </header>
        )}
    </>
  )
}
