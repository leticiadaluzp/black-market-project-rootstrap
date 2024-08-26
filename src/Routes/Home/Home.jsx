import creepyClerk from '../../assets/Igor_Persona5.gif'

export function Home(){
  return(
    <>
      <div className='flex flex-col items-center mt-8 md:mt-0'>
        <h1 className='text-2xl mt-3 md:mt-10 md:text-4xl'>Welcome to...</h1>
        <div className='w-full h-full flex items-center relative text-center overflow-hidden'>
          <h2 className='relative text-[4rem] font-bold m-auto leading-normal tracking-wider z-10 text-glitch text-glitch-duration-fast md:text-[4.4rem]'>Black Market</h2>
        </div>
        <img src={creepyClerk} alt="Igor persona character" className='w-11/12 mt-10 md:w-1/2 md:mt-8' />
      </div>
    </>
  );
}
