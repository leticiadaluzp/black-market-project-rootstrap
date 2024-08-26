import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import {axiosInstance} from "../../component/axios/axios";
import { Loader } from "../../component";

export function ProductDetail() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(false);
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
        console.log(response);
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
      toast.error("You need to be logged in to view this product.");
      navigate("/SignIn")
    }
  }, [id, isLoggedIn]);

  const handleAddToCart = () => {
    // Lógica para agregar el producto al carrito
    toast.success(`Added to cart: ${product.title}, quantity: ${quantity}`);
  };

  const handleAddToFavorites = () => {
    // TO DO: Add logic to add the product to favorites
    setIsFavorite(!isFavorite);
    toast.info(`${isFavorite ? 'Removed from' : 'Added to'} favorites: ${product.title}`);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (isLoading) return <Loader />

  if (!product) {
    return <p>Product not found.</p>;
  }

  return(
    <>
      <div>
        {/* ver los estilos */}
        <img className='h-48 w-full object-contain p-2' src={product.pictures[0]} alt={product.title} />
        <h3 className='text-center md:mt-5 md:text-xl'>{product.title}</h3>
        <p className='text-gray-500 text-sm'>{product.description}</p>
        <span className='block mt-2 font-semibold text-xl text-black'>{product.unit_price}</span>

        <div className="quantity-selector mt-4">
          <button onClick={decrementQuantity} className="px-2 py-1 bg-gray-300">-</button>
          <span className="px-4">{quantity}</span>
          <button onClick={incrementQuantity} className="px-2 py-1 bg-gray-300">+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add {quantity} to cart
        </button>

        <button
          onClick={handleAddToFavorites}
          className={`mt-4 px-4 py-2 ${isFavorite ? 'bg-red-600' : 'bg-gray-400'} text-white rounded-md ml-2`}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      
      </div>
    </>
  )
}
