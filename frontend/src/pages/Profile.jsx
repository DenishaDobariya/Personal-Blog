import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
  const param = useParams().id
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [updated, setUpdated] = useState(false)

  // Fetch the user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    } catch (err) {
      console.log(err)
    }
  }

  // Update user profile
  const handleUserUpdate = async () => {
    setUpdated(false)
    try {
      const res = await axios.put(URL + "/api/users/" + user._id, { username, email, password }, { withCredentials: true })
      setUpdated(true)
    } catch (err) {
      console.log(err)
      setUpdated(false)
    }
  }

  // Delete user profile
  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true })
      setUser(null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  // Fetch profile when the component mounts
  useEffect(() => {
    fetchProfile()
  }, [param])

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        {/* Profile Section */}
        <div className="flex flex-col space-y-4 items-start p-6 bg-white border rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="outline-none px-4 py-2 text-gray-500 border rounded-md mb-4 w-full transition duration-300 ease-in-out transform hover:border-blue-500 focus:border-blue-500"
            placeholder="Your username"
            type="text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none px-4 py-2 text-gray-500 border rounded-md mb-4 w-full transition duration-300 ease-in-out transform hover:border-blue-500 focus:border-blue-500"
            placeholder="Your email"
            type="email"
          />
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handleUserUpdate}
              className="text-white font-semibold bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-500 transition duration-300"
            >
              Update
            </button>
            <button
              onClick={handleUserDelete}
              className="text-white font-semibold bg-red-600 px-6 py-2 rounded-md hover:bg-red-500 transition duration-300"
            >
              Delete
            </button>
          </div>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
