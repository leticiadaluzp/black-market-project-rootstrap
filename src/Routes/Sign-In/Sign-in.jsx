import './Sign-in.css'

export default function SignIn (){
 return (
  <section className='sign-in-container'>
  <h2>Sign In </h2>
   <form action="">
    <div className='input-container'>
     <label htmlFor="email">Email</label>
     <input type="email" name="" id="email" required className='input-signIn' placeholder='Write your email here!' />
    </div>
    <div className='input-container'>
     <label htmlFor="password">Password</label>
     <input type="password" name="" id="password" required className='input-signIn' placeholder='Write your password here!' />
    </div>
    <input type="submit" value="Sign in" className='submit-button' />
   </form>
   <div className='info-container'>
    <small> {`Don't you have an account?`}</small>
    <small>Click here and get a new one!</small>
   </div>
  </section>
 )
}