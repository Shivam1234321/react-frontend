import { Link, useNavigate } from 'react-router-dom';
import checkAuth from '../auth/CheckAuth';
import { getAuthUser } from '../auth/AuthData';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
        <img src="logo.PNG" alt='logo' className='logo'/>
        {
            (checkAuth()) ?
            <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/login">Logout ({getAuthUser().name})</Link> </li>
            </ul>
            :
            <ul className="nav-ul nav-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        }
        </div>
    )
}
export default Nav;