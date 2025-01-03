import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
    const postId = useParams().id;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setFile(res.data.photo);
            setCats(res.data.categories);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;
            try {
                const imgUpload = await axios.post(URL + "/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.put(URL + "/api/posts/" + postId, post, {
                withCredentials: true,
            });
            navigate("/posts/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    };

    return (
        <div>
        <Navbar />
        <div className="px-6 md:px-[100px] mt-8 flex justify-center">
            <div className="w-full max-w-[700px] p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <h1 className="font-bold text-2xl md:text-3xl text-center">Update Your Post</h1>
            <form
                className="w-full flex flex-col space-y-6 md:space-y-8 mt-4"
                onSubmit={handleUpdate}
            >
                <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter post title"
                className="px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-black"
                />
                <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-black"
                />
                <div className="flex flex-col">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <input
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-black"
                    placeholder="Enter post category"
                    type="text"
                    />
                    <div
                    onClick={addCategory}
                    className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md"
                    >
                    Add
                    </div>
                </div>

                <div className="flex px-4 mt-3 flex-wrap gap-2">
                    {cats?.map((c, i) => (
                    <div
                        key={i}
                        className="flex justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md"
                    >
                        <p>{c}</p>
                        <p
                        onClick={() => deleteCategory(i)}
                        className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                        >
                        <ImCross />
                        </p>
                    </div>
                    ))}
                </div>
                </div>
                <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                rows={6}
                className="px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-black"
                placeholder="Enter post description"
                />
                <button
                type="submit"
                className="bg-black w-full text-white font-semibold px-4 py-2 text-lg rounded-md hover:bg-gray-800 transition duration-300"
                >
                Update
                </button>
            </form>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default EditPost;
