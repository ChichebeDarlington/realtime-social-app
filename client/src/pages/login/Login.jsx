import FormData from '../../components/formdata/FormData'
import './Login'
import { Link } from 'react-router-dom'

 const Login = () => {
  
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