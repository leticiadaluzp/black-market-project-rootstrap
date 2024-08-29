import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import {axiosInstance} from '../../component/axios/axios'
import { Loader } from '../../component'
import glassesGirl from '../../assets/futaba-persona-5.gif'

export function HomePage(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [current, setCurrent]= useState(0)
    const [translateValue, setTranslateValue] = useState(85)
    const [slidesNumber, setSlidesNumber]=useState(0)

    useEffect(() => {
      handleAuthentication();
    }, []);

     useEffect(() => {
  const updateTranslateValue = () => {
    if (window.innerWidth < 768) {
      setTranslateValue(96)
      setSlidesNumber(0)
    } else if (window.innerWidth < 1024) {
      setTranslateValue(90)
      setSlidesNumber(3)
    } else {
      setTranslateValue(96)
      setSlidesNumber(3)
    }
  };
  updateTranslateValue();
  window.addEventListener('resize', updateTranslateValue);

  // Cleanup to remover el listener cuando el componente se desmonte
  return () => window.removeEventListener('resize', updateTranslateValue);
}, []);

    const handleAuthentication = () => {
      setIsLoading(true);
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);
      if (!authStatus) {
        navigate('/SignIn');
      } else {
        fetchProducts();
      }
    };

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
        const response = await axiosInstance.get('/products', {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        //TO DO: how should we handle this error?
      } finally {
        setIsLoading(false);
      }
    };

    const previousSlide= () =>{
    current ===0 ? setCurrent(products.length -slidesNumber -1) : setCurrent(current-1)
    }

    const nextSlide= () =>{
      current ===(products.length - slidesNumber -1) ? setCurrent(0) : setCurrent(current +1)
    }

    const handleProductClick = (productId) => {
      navigate(`/product/${productId}`);
    };

    if (!isAuthenticated || isLoading) {
      return <Loader/>
    }

    return(
      <>
        <section className='mt-20' >
            <div className='flex items-center flex-col gap-4'>
              <h1 className='font-bold px-3 md:px-0 text-2xl md:text-5xl text-center tracking-wide'>
                Powering your tech dreams, one gadget at a time
              </h1>
              <img src={glassesGirl} alt='futaba persona character' className='md:w-[56%] border-double border-8 border-red-700 rounded-md' />
            </div>
            <h2 className='text-2xl mt-8 md:mt-10 md:text-4xl text-center mb-6'>Explore Our Products</h2>
            <div className='mt-12'>
              <div className='w-[90%] md:w-[60%] m-auto pb-11'>
                <div className='overflow-hidden relative'>
                  <div className='absolute top-1/2  -left-1 md:left-0 flex justify-between items-center text-3xl text-red-700 px-1 md:px-10 z-10 cursor-pointer'>
                  <button onClick={previousSlide} >
                    <FaArrowCircleLeft />
                  </button>
                </div>
                  <div className='flex md:gap-14 transition ease-out duration-400 mx-2 md:mx-0 md:ml-20 ' style={{transform: `translateX(-${current * translateValue}%)`}} >
                  {products.map(({id, title, pictures, description, unit_price}) =>(
                    <div key={title} className='rounded-xl bg-neutral-700 flex flex-col px-4 md:px-20 py-8 flex-wrap mx-4  md:mx-0 cursor-pointer' onClick={() => handleProductClick(id)}>
                      <img src={pictures[0]} alt={title} className='h-[180px] md:h-[240px] max-w-[200px] w-[200px] md:w-[300px]  md:max-w-[300px] object-cover rounded' />
                      <h2 className='text-lg mt-1  md:text-2xl'>{title}</h2>
                      <p className='text-sm my-1 line-clamp-2 md:line-clamp-none'>{description}</p>
                      <p className='text-xl md:text-2xl'>{unit_price}</p>
                    </div>
                  ))}
                </div>
                <div className='absolute top-1/2 -right-1 md:right-0 flex justify-between items-center text-3xl text-red-700 px-1 md:px-10 z-10 cursor-pointer'>
                  <button onClick={nextSlide}>
                    <FaArrowCircleRight />
                  </button>
                </div>
                <div className='absolute bottom-0 flex justify-center gap-5 w-full'>
                  {Array.from({length: products.length -slidesNumber}).map((_,i)=>{
                    return (<div key={i} onClick={()=>setCurrent(i)}  className={`rounded-full w-5 h-5 cursor-pointer ${i===current? 'bg-red-700' : 'bg-slate-600' }`}></div>)
                  })}
                </div>
                </div>
              </div>
            </div>
          </section>

      </>
    );
  }
