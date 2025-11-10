// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getPostById,
  deleteComment,
} from "../reducers/postReducer";

// Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newCommentSchema } from "../validations/commentSchema";

// Hooks & Components
import ReactTimeAgo from "react-time-ago";

// UI & Assets
import { GoTrash } from "react-icons/go";
import noAvatar from "../assets/images/noAvatar.png";

const Comments = ({ post }) => {
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(newCommentSchema),
    defaultValues: { comment: "" },
  });

  const handleAddCommentSubmit = async (data) => {
    const result = await dispatch(addComment(post._id, data));

    if (result.success) {
      await dispatch(getPostById(post._id));
      reset({ comment: "" });
    }
  };

  const handleDeleteCommentClick = async (postId, commentId) => {
    const result = await dispatch(deleteComment(postId, commentId));

    if (result.success) {
      await dispatch(getPostById(post._id));
    }
  };

  return (
    <section className="container w-[90%] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto my-10 xl:my-24 p-4 rounded bg-white">
      {/* First part: send comment */}
      <h3 className="mt-2 text-xl font-semibold">Comments</h3>
      {currentUser.token && (
        <>
          <p className="my-5 text-center text-sm sm:text-base font-semibold text-red-600">
            {errors.comment?.message}
          </p>

          <form
            className="mb-7 space-y-4"
            onSubmit={handleSubmit(handleAddCommentSubmit)}
          >
            <textarea
              className={`resize-none w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 transition ${
                errors.comment?.message
                  ? "focus:ring-red-400 border-red-400"
                  : "focus:ring-blue-400 border-gray-300"
              }`}
              rows={4}
              placeholder="Write a comment..."
              {...register("comment")}
              onChange={() => {
                if (errors.comment) {
                  clearErrors("comment");
                }
              }}
            />
            <button
              type="submit"
              className="py-2 px-4 rounded text-white bg-[#376bc0] hover:bg-[#2f5aad] transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Send
            </button>
          </form>

          <hr className="border-gray-300" />
        </>
      )}

      {/*  Second part: comment list  */}
      {post.comments.map((item) => (
        <div
          key={item._id}
          className="my-7 p-4 rounded bg-white border border-gray-300 shadow-sm "
        >
          <div className="flex items-center justify-between mb-5">
            {/*  Left part: avatar, name and time  */}
            <div className="flex items-start gap-3 min-w-0 ">
              <img
                src={item.user.avatar ? item.user.avatar : noAvatar}
                alt={item.user.username}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
              />

              <div className="flex flex-col min-w-0 pr-5">
                <h5 className="font-semibold text-xs sm:text-base truncate">
                  {item.user.username}
                </h5>
                <small className="text-xs text-gray-600">
                  <ReactTimeAgo date={new Date(item.createdAt)} />
                </small>
              </div>
            </div>

            {/*  Right part: delete button */}
            {currentUser?.user?.id === item.user._id && (
              <button
                onClick={() => handleDeleteCommentClick(post._id, item._id)}
                className=" text-base hover:text-red-400 transition-colors duration-300 ease-in-out cursor-pointer"
              >
                <GoTrash />
              </button>
            )}
          </div>
          {/*  Comment content */}
          <p className="text-sm lg:text-base break-words">{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default Comments;
