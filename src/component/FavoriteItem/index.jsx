import { FaHeart } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { axiosInstance } from '../../component/axios/axios';

export function FavoriteItem ({name, price, picture, id, onFavoriteToggle}){
  const handleFavoriteToggle = async (event) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}/favorite`, {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      toast.info(`Removed from favorites`);
      onFavoriteToggle(id);
    } catch (error) {
      console.error("Error toggling favorite:", error.response || error.message);
      toast.error("Something went wrong. Please try later");
    } 
  };
  
  return(
    <li className='flex flex-col md:flex-row gap-4 items-center md:justify-around border-2 border-slate-200 rounded-lg py-4 md:py-2 w-full md:px-6 mt-4'>
        <div className='flex-shrink-0 w-24 h-18 md:w-[20%] md:h-28 overflow-hidden rounded'>
        <img src={picture} alt="product" className='w-full h-full object-cover' />
        </div>
    <h2 className='w-[25%] text-center'>{name}</h2>
    <div className='flex gap-8'>
        <div className='flex flex-col items-center md:w-24'>
        <h2>Unit price</h2>
        <p>{price}</p>
        </div>
    </div>
    <FaHeart 
      className='hover:text-red-700 text-xl cursor-pointer text-red-700'
      onClick={handleFavoriteToggle} 
    />
    </li>
  )
}