export function SortButton ({text, onClick}){
 return(
  <button onClick={onClick} className='border-2 border-white py-2 px-4 rounded-xl ease-in-out duration-200 text-slate-900 bg-neutral-400 text-sm md:text-lg md:px-4 md:hover:bg-red-800 md:hover:text-slate-100' >
   {text}
  </button>
 )
}
