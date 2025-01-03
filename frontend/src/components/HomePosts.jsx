import { IF } from '../url'

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300">

      {/* Image Section */}
      <div className="w-[15%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt="post"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col w-[65%] p-4 overflow-hidden">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl break-words overflow-hidden text-ellipsis">
          {post.title}
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p className="truncate w-[70%]">{`@${post.username}`}</p>

          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <p className="text-sm md:text-lg break-words overflow-hidden text-ellipsis">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>

    </div>
  )
}

export default HomePosts
