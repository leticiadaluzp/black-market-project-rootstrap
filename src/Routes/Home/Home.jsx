import './Home.css'
import creepyClerk from '../../assets/Igor_Persona5.gif'

export default function Home(){
 return(
  <main>
   <h1>Welcome to...</h1>
   <div className='glitch-wrapper'>
    <h2 className='glitch' data-glitch="Black Market">Black Market</h2>
   </div>
   <img src={creepyClerk} alt="Igor-persona-5" className='creepy-clerk' />
  </main>
 )
}