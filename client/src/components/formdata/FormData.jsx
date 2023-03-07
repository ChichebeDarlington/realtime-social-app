import "./FormData.css"
import { useContextHook } from "../context/ContextAPI";

const FormData = ({login}) => {

    const {
      user,
        name,
        email,
        password,
        forgottenPassword,
        handleChange,
        handleRegister,
        handleLogin
        } = useContextHook()
// console.log(user);
        return (
     <form className="container" onSubmit={login ?handleLogin:handleRegister}>
  {!login &&  <div className="name-input inputs">
    <label htmlFor="name">Name</label>
    <input 
    type="text" 
    name='name' 
    id='name' 
    placeholder="Enter name"
    value={name}
     onChange={handleChange}
      />
    </div>}
    <div className="email-input inputs">
    <label htmlFor="email">Email</label>
    <input
     type="email" 
     name='email' 
     id='email' 
     placeholder='Enter email' 
     value={email} 
     onChange={handleChange}
     /> 
    </div>
    <div className="password-input inputs">
    <label htmlFor="password">Password</label>
    <input 
    type="password" 
    name='password' 
    id='password' 
    placeholder='Enter password' 
    value={password} 
    onChange={handleChange}
    />
    </div>
    
    {/* <div className="forgotten-password-input inputs">
    <label htmlFor="forgotten-password">Forgot password</label>
    <input 
    type="hidden" 
    name='forgottenPassword' 
    id='forgottenPassword' 
    placeholder='Forgotten-password' 
    value={forgottenPassword}
    onChange={handleChange}
    />
    </div> */}

    <div className="btn">
        <button type='submit'>{login?"Login":"Register"}</button>
    </div>
  </form>
  )
}

export default FormData