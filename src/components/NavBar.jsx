import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = async() => {
        try {
            const res = await axios.post(BASE_URL + 'logout', {}, {withCredentials: true})
            dispatch(removeUser())
            console.log(res)
            return navigate('/login')
        } catch (error) {
            console.log(error);
        }   
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">:) DevTinder</Link>
            </div>
            {user && <p>{user.firstName}</p>}
            <div className="flex gap-2">
                {user && (
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user.photoUrl}/>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <Link to={'/connections'}>Connections</Link>
                            </li>
                            <li>
                                <Link to={'/requests'}>Requests</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
