import { NavLink } from "react-router-dom";
import '../App.css';

const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center bg-emerald-200 p-4 mb-4">
            <div>
                <img src="/client/public/logo512.png" alt="our-logo"/>
            </div>
            <div className="flex gap-x-6">
                <NavLink className='p-2 bg-white border-2 px-9 rounded-3xl' to='tasks'>Tasks</NavLink>
                <NavLink className='p-2 bg-white border-2 px-9 rounded-3xl' to='/signup'>Signup</NavLink>
                <NavLink className='p-2 bg-white border-2 px-9 rounded-3xl' to='login'>Login</NavLink>
            </div>
        </div>
    )
}

export default Navbar;