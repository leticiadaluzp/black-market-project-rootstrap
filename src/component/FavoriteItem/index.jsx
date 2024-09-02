import { FaHeart } from 'react-icons/fa'

export function FavoriteItem ({name, price, picture, onClick}){
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
    <FaHeart className='hover:text-red-700 text-xl cursor-pointer' onClick={onClick} />
    </li>
  )
}