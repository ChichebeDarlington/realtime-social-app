import './Register'
import FormData from '../../components/formdata/FormData'
import { Link } from 'react-router-dom'

 const Register = () => {
 return (
  <div>
  <FormData/>
  <div>
    <p>Already a member? <Link className='link' to="/login">Login</Link></p>
  </div>
  </div>
 )
}

export default Register
