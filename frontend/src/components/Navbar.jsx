import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  
    const [prompt, setPrompt] = useState("");
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const showMenu = () => {
        setMenu(!menu);
    };
    
    const { user } = useContext(UserContext);

    return (
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4 z-50 bg-gray-100 shadow-lg sticky top-0">
        <h1 className="text-lg md:text-xl font-extrabold">
            <Link to="/">Blogsite</Link>
        </h1>

        {path === "/" && (
            <div className="flex justify-center items-center space-x-0 bg-white px-3 py-1 rounded-full">
            <input
                onChange={(e) => setPrompt(e.target.value)}
                className="outline-none px-3"
                placeholder="Search title & click search icon"
                type="text"
            />
            <p
                onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/"))
                }
                className="cursor-pointer"
            >
                <BsSearch />
            </p>
            </div>
        )}

        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 z-50">
            {user ? (
            <h3>
                <Link to="/write">Write</Link>
            </h3>
            ) : (
            <h3>
                <Link to="/login">Login</Link>
            </h3>
            )}
            {user ? (
            <div onClick={showMenu}>
                <p className="cursor-pointer relative">
                <FaBars />
                </p>
                {menu && <Menu />}
            </div>
            ) : (
            <h3>
                <Link to="/register">Register</Link>
            </h3>
            )}
        </div>

        <div onClick={showMenu} className="md:hidden text-lg">
            <p className="cursor-pointer relative">
            <FaBars />
            </p>
            {menu && <Menu />}
        </div>

        </div>
    );
};

export default Navbar;
