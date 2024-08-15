export function Loader (){
  return(
    <div className='flex items-center justify-center mt-16 gap-2'>
      <div
        className="inline-block h-8 w-8 md:h-14 md:w-14 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em]"
      >
      </div>
      <p className='font-bold text-lg animate-pulse'>Loading...</p>
    </div>
  )
}
