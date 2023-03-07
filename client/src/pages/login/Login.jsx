import FormData from '../../components/formdata/FormData'
import './Login'
import { Link, useNavigate } from 'react-router-dom'
import { useContextHook } from '../../components/context/ContextAPI'

 const Login = () => {
  const {redirect} = useContextHook()

  const navigate = useNavigate()
  
  return (
    <div className='sign-in'>
      <FormData login="login"/>
      <div>
    <p>Not yet a member? <Link className='link' to="/register">Register</Link></p>
  </div>
    </div>
  )
}
export default Login