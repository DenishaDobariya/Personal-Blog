import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await axios.post(
            URL + "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        setUser(res.data);
        navigate("/");
    } catch (err) {
        setError(true);
        console.log(err);
    }
  };

  return (
    <>
        {/* Navbar */}
        <div className="flex items-center justify-between px-6 md:px-20 py-4 bg-gray-100 shadow-sm sticky top-0 z-50">
            <h1 className="text-lg md:text-2xl font-extrabold text-black">
            <Link to="/">Blogsite</Link>
            </h1>
            <h3>
            <Link
                to="/register"
                className="text-sm md:text-base font-semibold text-blue-600 hover:text-blue-800"
            >
                Register
            </Link>
            </h3>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center h-[80vh] bg-gray-50 px-4">
            <div className="w-full md:w-1/3 bg-white p-6 md:p-10 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Log in to your account
            </h1>
            <form className="space-y-4">
                <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your email"
                />
                <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
                />
                <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                Log in
                </button>
            </form>
            {error && (
                <p className="mt-4 text-center text-sm text-red-500">
                Invalid email or password. Please try again.
                </p>
            )}
            <div className="mt-6 flex justify-center items-center space-x-2 text-sm">
                <p className="text-gray-600">New here?</p>
                <Link
                to="/register"
                className="text-blue-600  text-black-600 hover:underline hover:text-blue-800"
                >
                Register
                </Link>
            </div>
            </div>
        </div>

        <Footer />
    </>
  );
};

export default Login;
