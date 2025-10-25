// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  patchPost,
  getPostByIdForEdit,
  clearSingleForEdit,
} from "../reducers/postReducer";

// Form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePostSchema } from "../validations/postSchema";

// Hooks & Components
import useAuthRedirect from "../hooks/useAuthRedirect";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Config
import { modules, formats } from "../config/reactQuillConfig";

const EditPost = () => {
  useAuthRedirect();

  const { id } = useParams();
  const postToEdit = useSelector((state) => state.post.singleForEdit);
  const isLoading = useSelector((state) => state.post.loading.singleForEdit);
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, dirtyFields },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(updatePostSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      desc: "",
      tags: "",
      thumbnail: null,
    },
  });

  useEffect(() => {
    dispatch(getPostByIdForEdit(id));
    return () => {
      dispatch(clearSingleForEdit());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (postToEdit) {
      reset({
        title: postToEdit.title,
        desc: postToEdit.desc,
        tags: postToEdit.tags,
        thumbnail: postToEdit.thumbnail,
      });
      setThumbnail(postToEdit.thumbnail);
    }
  }, [postToEdit, reset]);

  const handleEditSumbit = async (data) => {
    if (!isDirty) {
      return;
    }

    const updatedFields = {};

    Object.keys(dirtyFields).forEach((key) => {
      updatedFields[key] = data[key];
    });

    const formData = new FormData();

    if (updatedFields.title) {
      formData.append("title", updatedFields.title);
    }

    if (updatedFields.desc) {
      formData.append("desc", updatedFields.desc);
    }

    if ("tags" in updatedFields) {
      formData.append("tags", updatedFields.tags);
    }

    if (updatedFields.thumbnail) {
      formData.append("thumbnail", updatedFields.thumbnail);
    }

    const result = await dispatch(patchPost(formData, id));

    if (!result.success && result.message) {
      if (result.message.includes("Thumbnail is too large")) {
        setError("thumbnail", { type: "server", message: result.message });
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className="container mx-auto my-10 lg:my-24 p-4">
      {/* Edit Post */}
      {postToEdit ? (
        <div className="p-6 bg-white rounded shadow-lg">
          <h2 className="my-15 text-center text-3xl text-gray-700 font-bold after:content-[''] after:block after:w-20 after:h-[2px] after:bg-gray-300 after:mx-auto after:mt-2 select-none">
            Edit post
          </h2>

          {/* Edit Post from */}
          <form onSubmit={handleSubmit(handleEditSumbit)}>
            <input
              className={`px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 ${
                errors.title?.message
                  ? "focus:ring-red-400 border-red-300"
                  : "focus:ring-blue-400 border-slate-300"
              }`}
              type="text"
              placeholder="Title"
              {...register("title")}
            />
            <p className="mt-1 ml-1 text-sm font-semibold text-red-600">
              {errors.title?.message}
            </p>
            <input
              className={`mt-5 px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 ${
                errors.tags?.message
                  ? "focus:ring-red-400 border-red-300"
                  : "focus:ring-blue-400 border-slate-300"
              }`}
              type="text"
              placeholder="e.g. sport, health, news"
              {...register("tags")}
            />
            <p className="mt-1 ml-1 text-sm font-semibold text-red-600">
              {errors.tags?.message}
            </p>

            <div className="mt-5 h-65">
              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    className="h-full"
                    {...field}
                    modules={modules}
                    formats={formats}
                  />
                )}
              />
            </div>
            <p className="mt-24 sm:mt-12 ml-1 text-sm font-semibold text-red-600">
              {errors.desc?.message || "\u00A0"}
            </p>

            {/* Download file label */}
            <div className="flex items-center gap-3 mt-10">
              <label
                htmlFor="thumbnail"
                className="py-1 px-4 rounded border border-gray-400 hover:bg-gray-100 transition flex-shrink-0"
              >
                Choose file
              </label>

              <div className="text-gray-500 truncate">
                {typeof thumbnail === "string"
                  ? thumbnail.split("/").pop()
                  : thumbnail.name}
              </div>

              {/* Hidden input file */}
              <input
                className="hidden"
                type="file"
                name="thumbnail"
                id="thumbnail"
                {...register("thumbnail")}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setThumbnail(file); // for label
                  setValue("thumbnail", file, { shouldDirty: true }); // for RHF validation
                  clearErrors("thumbnail");
                }}
                accept="image/jpeg, image/jpg, image/png, image/webp, image/heic, image/heif"
              />
            </div>
            <p className="mt-2 ml-1 text-sm font-semibold text-red-600">
              {errors.thumbnail?.message}
            </p>
            <div className="flex justify-center my-6">
              <button
                type="submit"
                className={`py-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 text-white rounded transition-colors duration-300 ease-in-out ${
                  isDirty
                    ? "bg-[#376bc0] hover:bg-[#2f5aad] cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <h2 className="text-center text-base sm:text-2xl gradient-text font-extrabold uppercase select-none">
            Post not found{" "}
          </h2>
        </div>
      )}
    </section>
  );
};

export default EditPost;
