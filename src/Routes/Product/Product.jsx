import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import {axiosInstance} from "../../component/axios/axios";
import { Loader } from "../../component";

export function ProductDetail() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); 
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
    </>
  )
}
