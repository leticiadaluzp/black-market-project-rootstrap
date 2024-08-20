import React, { useState, useEffect } from 'react';
import {axiosInstance} from "../../component/axios/axios";

export function HomePage(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const authStatus = checkAuth(); 
      setIsAuthenticated(authStatus);
      if (authStatus) {
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
        //TO DO: how should we handle this error?
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
          <div >
            {/* TO DO: should we put something here? */}
          </div>
        )}
      </>
    );
  }
  