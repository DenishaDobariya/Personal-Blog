import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [cat, setCat] = useState('');
    const [cats, setCats] = useState([]);

    const navigate = useNavigate();

    const deleteCategory = (index) => {
        let updatedCats = [...cats];
        updatedCats.splice(index, 1);
        setCats(updatedCats);
    };

  const addCategory = () => {
    if (cat.trim()) {
        setCats((prev) => [...prev, cat.trim()]);
        setCat('');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
        alert('Please fill in all required fields.');
        return;
    }

    const post = {
        title,
        desc,
        username: user?.username || 'anonymous',
        userId: user?._id || null,
        categories: cats,
    };

    if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append('img', filename);
        data.append('file', file);
        post.photo = filename;

      try {
        await axios.post(`${URL}/api/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
      } catch (err) {
        console.error('Image upload failed:', err.response?.data || err.message);
        return;
      }
    }

    try {
        const res = await axios.post(`${URL}/api/posts/create`, post, { withCredentials: true });
        navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
        console.error('Post creation failed:', err.response?.data || err.message);
    }
  };

    return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="px-4 md:px-20 mt-8">
            <h1 className="font-bold text-2xl md:text-3xl mb-6 text-center">Create a Post</h1>
            <form
            className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
            onSubmit={handleCreate}
            >
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter post title"
                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
                required
            />
            <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="w-full px-4 py-2 border rounded-md"
            />
            <div className="space-y-3">
                <div className="flex items-center space-x-4">
                <input
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter post category"
                    type="text"
                />
                <button
                    type="button"
                    onClick={addCategory}
                    className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800"
                >
                    Add
                </button>
                </div>
                <div className="flex flex-wrap gap-2">
                {cats.map((c, i) => (
                    <div
                    key={i}
                    className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full"
                    >
                    <p>{c}</p>
                    <button
                        type="button"
                        onClick={() => deleteCategory(i)}
                        className="text-white bg-black rounded-full p-1"
                    >
                        <ImCross />
                    </button>
                    </div>
                ))}
                </div>
            </div>
            <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                rows={10}
                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter post description"
                required
            />
            <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium text-lg rounded-md hover:bg-gray-800"
            >
                Create Post
            </button>
            </form>
        </div>
        <Footer />
        </div>
    );
};

export default CreatePost;
