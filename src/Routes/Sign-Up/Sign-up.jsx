import { Input } from "../../component"

export function SignUp(){
  return (
    <section className='mt-8 m-auto md:max-w-[600px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50  '>
      <h2 className='text-center md:mt-5 md:text-xl'>Sign Up </h2>
      <form action='' className='flex flex-col'>
        <Input name='Email' id='email' type='email' placeholder='Write your email here!'/>
        <Input name='Name' id='name' type='text' placeholder='Write your name here!'/> 
        <Input name='Password' id='password' type='password' placeholder='Write your password here!'/>
        <Input name='Confirm your password' id='password-confirm' type='password' placeholder='Confirm your password here!'/>
        {/* <div className='flex items-center justify-center mb-4 w-full'> */}
        <div className='flex items-center mb-4 w-11/12 m-auto md:pl-20'>
          <input type='checkbox' required className='form-checkbox mr-2 ' />
          <span className=''>Accept terms and conditions</span>
        </div>
        <input type="submit" value="Create account" className='m-auto w-40 h-10 border border-slate-50 border-solid rounded-lg transition-all ease-in-out duration-100 md:text-lg md:hover:bg-red-800' />
      </form>

    </section>
  )
}
