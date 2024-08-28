import { useRouteError, Link } from 'react-router-dom'
import notFound from '../../assets/show-over.png'

export function NotFound () {
  const error = useRouteError()
  return (
    <div className='flex flex-col items-center mt-4'>
      <img src={notFound} alt="image 404" className='h-[300px] md:h-[600px] md:mt-10 rounded-2xl' />
      <i>{error.statusText || error.message}</i>
      <h3 className='text-lg mt-3 object-contain'>Are you lost?</h3>
      <button className='m-auto mt-3 w-32 h-10 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800'>
        <Link to={'/'}>Go back</Link>
      </button>
    </div>
  )
}
