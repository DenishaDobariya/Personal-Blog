import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId);
            setPost(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeletePost = async () => {
        try {
            await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPostComments = async () => {
        setLoader(true);
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId);
            setComments(res.data);
            setLoader(false);
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPostComments();
    }, [postId]);

    const postComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                URL + "/api/comments/create",
                { comment, author: user.username, postId, userId: user._id },
                { withCredentials: true }
            );
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(URL + "/api/comments/" + commentId, { withCredentials: true });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Navbar />
            {loader ? (
                <div className="h-[80vh] flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="px-4 md:px-20 mt-8 flex justify-center">
                    <div className="w-full md:w-[50%] space-y-8 border-2 border-gray-300 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl md:text-3xl font-bold break-words overflow-hidden text-ellipsis whitespace-nowrap">
                                {post.title}
                            </h1>
                            {user?._id === post?.userId && (
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="text-lg text-gray-600 hover:text-gray-900"
                                        onClick={() => navigate("/edit/" + postId)}
                                    >
                                        <BiEdit />
                                    </button>
                                    <button
                                        className="text-lg text-red-600 hover:text-red-800"
                                        onClick={handleDeletePost}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                            <p>By @{post.username}</p>
                            <p>
                                {new Date(post.updatedAt).toLocaleDateString()}{" "}
                                {new Date(post.updatedAt).toLocaleTimeString()}
                            </p>
                        </div>

                        {post.photo && (
                            <div className="flex justify-center mt-6">
                                <img
                                    src={IF + post.photo}
                                    alt="Post"
                                    className="w-full md:w-[40%] h-auto rounded-lg object-cover"
                                />
                            </div>
                        )}

                        <p className="mt-6 text-gray-800 break-words">{post.desc}</p>

                        {post.categories?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold">Categories:</h3>
                                <div className="flex flex-wrap mt-2">
                                    {post.categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600 mr-2 mb-2"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <h3 className="font-semibold">Comments:</h3>
                            {comments.length === 0 ? (
                                <p className="text-gray-500 mt-2">No comments yet.</p>
                            ) : (
                                comments.map((c) => (
                                    <div key={c._id} className="mt-4">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{c.author}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(c.createdAt).toLocaleDateString()}{" "}
                                                {new Date(c.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 p-4 border-2 border-gray-300 rounded-lg bg-gray-100">
                                            <div className="flex justify-between items-center">
                                                {/* Comment Text */}
                                                <p className="text-gray-700 break-words overflow-hidden text-ellipsis w-full">
                                                {c.comment}
                                                </p>

                                                {/* Delete Button */}
                                                {user?._id === c.userId && (
                                                <button
                                                    className="text-red-600 text-sm flex items-center space-x-1"
                                                    onClick={() => handleDeleteComment(c._id)}
                                                >
                                                    <MdDelete /> 
                                                </button>
                                                )}
                                            </div>
                                        </div>  
                                    </div>
                                ))
                            )}
                        </div>

                        <form
                            onSubmit={postComment}
                            className="flex flex-col items-center space-y-4 mt-6 border-2 border-gray-300 p-6 rounded-lg shadow-lg"
                        >
                            <input
                                type="text"
                                placeholder="Write a comment"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none focus:ring focus:ring-gray-300"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 w-full"
                            >
                                Add Comment
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default PostDetails;
