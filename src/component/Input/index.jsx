export function Input({id, name, placeholder, type}){
  return (
    <div className='flex flex-col gap-1 w-11/12 m-auto mb-5 md:max-w-1/2'>
      <label htmlFor={id} className="md:pl-20">{name}</label>
      <input type={type} name={id} id={id} required className='rounded-3xl h-8 placeholder:pl-2  indent-3 text-gray-700 md:m-auto md:w-[400px]' placeholder={placeholder} />
    </div>
  )
}
