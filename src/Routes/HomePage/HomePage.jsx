import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { axiosInstance } from '../../component/axios/axios';
import { Loader } from '../../component'
import glassesGirl from '../../assets/futaba-persona-5.gif'
import { UserSessionContext } from '../../component/context/UserSessionProvider';

export function HomePage(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [current, setCurrent]= useState(0);
    const [translateValue, setTranslateValue] = useState(100);
    const [slidesNumber, setSlidesNumber]=useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { checkAuth } = useContext(UserSessionContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      handleAuthentication();
    }, []);

    useEffect(() => {
      const updateTranslateValue = () => {
        if (window.innerWidth < 768) {
          setTranslateValue(100);
          setSlidesNumber(1);
          setIsMobile(true);
        } else if (window.innerWidth < 1024) {
          setTranslateValue(50);
          setSlidesNumber(2);
          setIsMobile(false);
        } else {
          setTranslateValue(50);
          setSlidesNumber(2);
          setIsMobile(false);
        }
      };
      updateTranslateValue();
      window.addEventListener('resize', updateTranslateValue);
      return () => window.removeEventListener('resize', updateTranslateValue);
    }, []);

    const handleAuthentication = () => {
      setIsLoading(true);
      const authStatus = checkAuth();
      setIsAuthenticated(authStatus);
      if (!authStatus) {
        navigate('/sign-in');
      } else {
        fetchProducts();
      }
    };

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

    const previousSlide = () => {
      setCurrent((prev) => (prev === 0 ? products.length - slidesNumber : prev - 1));
    };
    
    const nextSlide = () => {
      setCurrent((prev) => (prev === products.length - slidesNumber ? 0 : prev + 1));
    };

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
              <div className='flex w-[100%] md:w-[85%] m-auto pb-11'>
                <div className='relative top-1/2  -left-1 md:left-0 flex justify-between items-center text-3xl text-red-700 px-1 md:px-10 z-10 cursor-pointer'>
                  <button onClick={previousSlide} >
                    <FaArrowCircleLeft />
                  </button>
                </div>
                <div className='overflow-hidden relative'>
                  <div className='flex transition ease-out duration-400' style={{transform: `translateX(-${current * translateValue}%)`}} >
                    {products.map(({id, title, pictures, description, unit_price}) =>(
                      <div key={title} className={`rounded-xl ${isMobile ? 'max-w-[95%] min-w-[95%]' : 'max-w-[45%] min-w-[45%]'} bg-neutral-700 flex flex-col px-4 py-8 flex-wrap mr-[5%] cursor-pointer`} onClick={() => handleProductClick(id)}>
                        <div className="bg-white mb-4 rounded-lg shadow-md overflow-hidden flex justify-center items-center">
                          <img src={pictures[0]} alt={title} className='h-[200px] md:h-[240px] max-w-[200px] w-[200px] md:w-[300px]  md:max-w-[100%] object-contain p-2'/>
                        </div>
                        <h2 className='text-lg mt-1  md:text-2xl'>{title}</h2>
                        <p className='text-sm my-1 line-clamp-2 md:line-clamp-none'>{description}</p>
                        <p className='text-xl md:text-2xl'>{unit_price}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='relative top-1/2 -right-1 md:right-0 flex justify-between items-center text-3xl text-red-700 px-1 md:px-[1.5rem] z-10 cursor-pointer'>
                    <button onClick={nextSlide}>
                      <FaArrowCircleRight />
                    </button>
                  </div>
              </div>
            </div>
          </section>

      </>
    );
  }
