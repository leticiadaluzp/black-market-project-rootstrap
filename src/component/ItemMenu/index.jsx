import { TiShoppingCart } from 'react-icons/ti'
import { FaHome, FaSignOutAlt, FaHeart} from 'react-icons/fa'
import { Link } from "react-router-dom"

export function ItemMenu({text, path, onClick, icon}){
    const styles='text-2xl'
    const renderIcon = () => {
      switch(icon){
        case 'home':
          return <FaHome className={styles} />
        case 'cart':
          return <TiShoppingCart className={styles} />
        case 'fav':
          return <FaHeart className={styles} />
        case 'logOut':
          return <FaSignOutAlt className={styles} />
        default:
          return null
      }
  };

  return (
    <li className='h-full border-none px-1 ease-in-out duration-200 pt-3.5 md:pt-5 text-sm md:text-lg md:px-4 md:hover:bg-red-800'>
      <Link to={path} onClick={onClick} className='flex items-center gap-1'>
        {renderIcon()}
        <p className='hidden lg:block'>{text}</p>
      </Link>
    </li>
  )
}
