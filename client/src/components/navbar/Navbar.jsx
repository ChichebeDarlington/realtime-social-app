import "./Navbar.css"
import {Link} from "react-router-dom"
import Login from "../../pages/login/Login"
import Register from "../../pages/register/Register"


 const Navbar = () => {
  return (
    <nav className="navbar">
        <ul className="list">
            <Link className="list-item" to="/">Home</Link>
            <Link className="list-item" to="/register">Register</Link>
            <Link className="list-item" to="/login">Login</Link>
        </ul>
    </nav>
  )
}
export default Navbar