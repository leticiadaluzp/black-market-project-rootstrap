import { TiShoppingCart } from 'react-icons/ti'
import { FaHome, FaSignOutAlt} from 'react-icons/fa'
import { Link } from "react-router-dom"

export function ItemMenu({text, path, onClick, icon, permit}){
    const styles='text-2xl'
    const renderIcon = () => {
      switch(icon){
        case 'home':
          return <FaHome className={styles} />
        case 'cart':
          return <TiShoppingCart className={styles} />
        case 'logOut':
          return <FaSignOutAlt className={styles} />
        default:
          return null
      }
  };

  const textClasses = permit === 'auth' 
    ? 'hidden lg:block' 
    : 'block md:hidden';

  return (
    <li className='h-full border-none px-1 ease-in-out duration-200 pt-3.5 md:pt-5 text-sm md:text-lg md:px-4 md:hover:bg-red-800'>
      <Link to={path} onClick={onClick} className='flex items-center gap-1'>
        {renderIcon()}
        <p className={textClasses}>{text}</p>
      </Link>
    </li>
  )
}
