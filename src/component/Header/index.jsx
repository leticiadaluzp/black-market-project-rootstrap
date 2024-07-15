import './index.css'
import logo from '../../assets/logo.png'

export default function Header() {
 return (
  <>
  <header>
   <div className='logo-container'>
    <img src={logo} alt="logo" />
    <h1>Black Market</h1>
   </div>
   <div className='buttons-container'>
    <button className='sign-button'>Sign In</button>
    <button className='sign-button'>Sign Up</button>
   </div>
  </header>
  </>
 )
}