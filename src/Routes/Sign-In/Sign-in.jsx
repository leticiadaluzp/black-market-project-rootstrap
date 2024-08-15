import { Input } from "../../component"

export function SignIn (){
  return (
    <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
      <h2 className='text-center md:mt-5 md:text-xl'>Sign In </h2>
      <form action='' className='flex flex-col'>
        <Input name='Email' id='email' type='email' placeholder='Write your email here!'/>
        <Input name='Password' id='password' type='password' placeholder='Write your password here!'/>
        <input type="submit" value="Sign in" className='m-auto w-32 h-10 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
      </form>
      <div className='flex flex-col items-center gap-1 mt-6'>
        <small>Don't you have an account?</small>
        <small>Click here and get a new one!</small>
      </div>
    </section>
  )
}
