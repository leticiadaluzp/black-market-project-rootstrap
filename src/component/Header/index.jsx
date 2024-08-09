import { SignButton } from '../index.js'
import logo from '../../assets/logo.png'

export function Header() {
  return (
    <>
      <header className='flex box-border justify-between w-full h-10 py-0.5 px-2.5 md:h-16 md:py-0 md:px-[10%] md:shadow-extra'>
        <div className='flex items-center pl-0.25 gap-1'>
          <img src={logo} alt="logo" className='w-8 h-8' />
          <h1 className='font-logo text-sm md:text-lg'>Black Market</h1>
        </div>
        <div className='flex md:pr-0.25  md:gap-2'>
          <SignButton text={'Sign In'}/>
          <SignButton text={'Sign Up'}/>
        </div>
      </header>
    </>
  )
}
