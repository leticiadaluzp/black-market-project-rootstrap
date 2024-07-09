import './SignUpForm.css'

export default function SignUpForm() {
 return (
  <>
    <h1>Crear cuenta</h1>
   
    <div className='sign-up-form'>
      <form>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" required/>
        </div>

        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required/>
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required/>
        </div>

        <div>
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input type="password" id="confirm-password" name="confirm-password" required/>
        </div>        

        <div>
          <label htmlFor="terms-and-conditions">Acepta los términos y condiciones</label>
          <input type="checkbox" id="terms-and-conditions" name="terms-and-conditions" required/>
        </div>  

        <div id="button">
            <button type="submit">Crear cuenta</button> 
        </div>

      </form>
    </div>

  </>
 )
}