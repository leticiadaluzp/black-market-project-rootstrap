import React, { useState, useEffect } from 'react';
import {axiosInstance} from "../../component/axios/axios";;
import creepyClerk from '../../assets/Igor_Persona5.gif'

export function Home(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const authStatus = checkAuth(); 
    setIsAuthenticated(authStatus);
    console.log("en el useEffect");
    if (authStatus) {
      console.log("en el if")
      fetchProducts();
    }
  }, []);

  const checkAuth = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUid = localStorage.getItem('uid');
    const storedClient = localStorage.getItem('client');
  
    if (storedAccessToken && storedUid && storedClient) {
      return true; 
    }
    return false;  
  }

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return(
    <>
      {isAuthenticated ? (
         <section>
            <h1 className='text-2xl mt-3 md:mt-10 md:text-4xl text-center mb-6'>Explore Our Products</h1>
            <div>
              <ul className='flex flex-wrap justify-center'>
                {products.map(({ title, pictures, description, unit_price }) => (
                  <li key={title} className='m-4 w-64'>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                      <img className='h-48 w-full object-contain p-2' src={pictures[0]} alt={title} />
                      <div className='p-4 flex-grow'>
                        <h3 className='font-bold text-lg text-gray-800 mb-2'>{title}</h3>
                        <p className='text-gray-500 text-sm'>{description}</p>
                        <span className='block mt-2 font-semibold text-xl text-black'>{unit_price}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
      ) : (
        <div className='flex flex-col items-center mt-8 md:mt-0'>
          <h1 className='text-2xl mt-3 md:mt-10 md:text-4xl'>Welcome to...</h1>
          <div className='w-full h-full flex items-center relative text-center overflow-hidden'>
            <h2 className='relative text-[4rem] font-bold m-auto leading-normal tracking-wider z-10 text-glitch text-glitch-duration-fast md:text-[4.4rem]'>Black Market</h2>
          </div>
          <img src={creepyClerk} alt="Igor persona character" className='w-11/12 mt-10 md:w-1/2 md:mt-8' />
        </div>
      )}
    </>
  );
}
