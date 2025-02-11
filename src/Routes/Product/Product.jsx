import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { FaHeart, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import {axiosInstance} from "../../component/axios/axios";
import { Loader } from "../../component";

export function ProductDetail() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); 
  const [current, setCurrent]= useState(0);
  const [translateValue, setTranslateValue] = useState(100);
  const [slidesNumber, setSlidesNumber]=useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`, {
          headers: {
            'access-token': localStorage.getItem('accessToken'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client')
          }
        });
        setProduct(response.data);
        setIsFavorite(response.data.is_favorite);
        fetchRecommendedProducts(response.data.category.name);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("You need to sign in or sign up before continuing.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProduct();
    } else {
      navigate("/sign-in")
    }
  }, [id, isLoggedIn]);

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

  const handleAddToCart = async (event) => {
    if (product.stock < quantity) {
      toast.error('Insufficient stock available.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `/shopping_cart/line_items`,
        {
          line_item: {
            quantity,
            product_id: id,
          },
        },
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
          },
        }
      );
      toast.success(`${product.title} was added to the cart`);
    } catch (error) {
      if (error.response) {
        const { status, data: { errors = [] } = {} } = error.response;
        switch (status) {
          case 422:
            toast.error(errors[0] || 'Unprocessable content.');
            break;
          case 401:
            toast.error("You need to sign in or sign up before continuing.");
            break;
          default:
            toast.error('Something went wrong. Please try again.');
            break;
          }
        } else {
          toast.error('Network error. Please check your connection.');
        }
      } finally {
        setIsLoading(false);
      }
    };

  const handleAddToFavorites = async (event) => {
    if (isFavorite) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.delete(`/products/${id}/favorite`, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
          },
        });
        setIsFavorite(!isFavorite);
      } catch (error) {
        toast.error("Something went wrong. Please try later")
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post(`/products/${id}/favorite`, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
          },
        });
        setIsFavorite(!isFavorite);
      } catch (error) {
        toast.error("Something went wrong. Please try later")
      } finally {
        setIsLoading(false);
      }
    }
    toast.info(`${product.title} ${isFavorite ? 'removed from' : 'added to'} favorites`);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const fetchRecommendedProducts = async (categoryName) => {
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          categories: [categoryName]
        },
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
        
      });
      const filteredProducts = response.data.data.filter(recommendedProduct => recommendedProduct.id !== parseInt(id));
      setRecommendedProducts(filteredProducts);
    } catch (error) {
      toast.error("Error fetching recommended products.");
    }
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? recommendedProducts.length - slidesNumber : prev - 1));
  };
  
  const nextSlide = () => {
    setCurrent((prev) => (prev === recommendedProducts.length - slidesNumber ? 0 : prev + 1));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading || !product) return <Loader />


  return(
    <>
      <div className="flex flex-col items-center min-h-screen py-10">
        <div className="bg-neutral-700 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="bg-white p-2 rounded-md shadow-md mb-4">
            <img
              className="h-64 w-full object-contain mb-4 rounded"
              src={product.pictures[0]}
              alt={product.title}
            />
          </div>
          <h3 className="text-2xl font-bold text-white-800 text-center mb-2">
            {product.title}
          </h3>
          <p className="text-gray-400 text-center mb-4">{product.description}</p>
          <span className="block text-center text-2xl font-semibold text-white-800 mb-6">
            {product.unit_price}
          </span>

          <div className="flex items-center justify-center mb-4">
            <button
              onClick={decrementQuantity}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
            >
              -
            </button>
            <span className="px-6 py-2 bg-gray-200 text-gray-800">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
            >
              +
            </button>
          </div>

          <div className="flex justify-center items-center mt-4 ml-10 space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Add {quantity} to cart
            </button>
            <button
              onClick={handleAddToFavorites}
              className="ml-4 focus:outline-none"
            >
              <FaHeart color={isFavorite ? 'red' : 'gray'} size={24} />
            </button>
          </div>
        </div>
      </div>
      {Array.isArray(recommendedProducts) && recommendedProducts.length > 0 && (
        <>
          <h2 className='text-2xl mt-8 md:mt-10 md:text-4xl text-center mb-6'>Recommended Products</h2>
          <div className='mt-12'>
            <div className='flex w-[100%] md:w-[85%] m-auto pb-11'>
            {recommendedProducts.length > 2 && (
              <div className='relative flex items-center'>
                <button className="p-2 rounded-full bg-neutral-700 shadow-md hover:bg-neutral-500" onClick={previousSlide}>
                  <FaArrowCircleLeft size={28} color='white'/>
                </button>
              </div>
            )}
              <div className={`overflow-hidden relative w-[100%] md:w-[90%] m-auto`}>
                <div className={`flex transition-transform duration-500 ease-in-out transform`} style={{ transform: `translateX(-${current * translateValue}%)` }}>
                  {recommendedProducts.map(({ id, title, pictures, description, unit_price }) => (
                    <div key={title} className={`rounded-xl ${isMobile ? 'max-w-[95%] min-w-[95%]' : 'max-w-[45%] min-w-[45%]'} bg-neutral-700 flex flex-col px-4 py-8 flex-wrap mr-[5%] cursor-pointer`} onClick={() => handleProductClick(id)}>
                      <div className="bg-white mb-4 rounded-lg shadow-md overflow-hidden flex justify-center items-center">
                        <img src={pictures[0]} alt={title} className='h-[200px] md:h-[240px] max-w-[200px] w-[200px] md:w-[300px]  md:max-w-[100%] object-contain p-2'/>
                      </div>
                      <h2 className='text-lg mt-1 md:text-2xl'>{title}</h2>
                      <p className='text-sm my-1 line-clamp-3'>{description}</p>
                      <p className='text-xl md:text-2xl'>{unit_price}</p>
                    </div>
                  ))}
                </div>
              </div>
              {recommendedProducts.length > 2 && (
                <div className='relative flex items-center'>
                  <button className="p-2 rounded-full bg-neutral-700 shadow-md hover:bg-neutral-500" onClick={nextSlide}>
                    <FaArrowCircleRight size={28} color='white'/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
