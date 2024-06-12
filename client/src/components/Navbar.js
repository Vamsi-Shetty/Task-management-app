import { NavLink } from "react-router-dom";
import '../App.css';

const Navbar = () => {
    return (
        <div>
            <NavLink to='/'>Signup</NavLink>
            <NavLink to='login'>Login</NavLink>
            <NavLink to='tasks'>Tasks</NavLink>
        </div>
    )
}

export default Navbar;