import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'

export function ShoppingItem ({name, quantity, price, picture, onIncrement, onDecrement}){
 return(
  <li className='flex flex-col md:flex-row gap-4 items-center md:justify-around border-2 border-slate-200 rounded-lg py-4 md:py-2 w-full md:px-6 mt-4'>
   <img src={picture} alt="product" className='w-12 h-12 rounded' />
   <h2>{name}</h2>
   <div className='flex gap-8'>
    <div className='flex flex-col items-center'>
     <h2>Quantity</h2>
     <p>{quantity}</p>
    </div>
    <div className='flex flex-col items-center'>
     <h2>Unit price</h2>
     <p>{price}</p>
    </div>
   </div>
    <div className='flex gap-8 md:gap-4'>
     <FaPlusCircle  className='hover:text-red-700 text-xl' onClick={onIncrement} />
     <FaMinusCircle className='hover:text-red-700 text-xl' onClick={onDecrement} />
    </div>
   <FaTrashCan className='hover:text-red-700 text-xl' />
  </li>
 )
}
