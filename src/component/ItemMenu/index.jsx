import { Link } from "react-router-dom"

export function ItemMenu({text, path, onClick}){
  return (
    <li className='h-full border-non px-1 ease-in-out duration-200 pt-3.5 md:pt-5 text-sm md:text-lg md:px-4 md:hover:bg-red-800'>
      <Link to={path} onClick={onClick}>
        {text}
      </Link>
    </li>
  )
}
