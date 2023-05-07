import { toast } from "react-toastify";
import "./ContentPost.css";
import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

const ContentPost = ({
  content,
  setContent,
  handlePost,
  handleImage,
  image,
  imageLoading,
}) => {
  return (
    <div className="w-full text-center">
      <form className="">
        <textarea
          className="w-5/6 border-solid border-2 border-gray-500 my-3 rounded outline-none"
          name=""
          id=""
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </form>
      <div className="flex justify-center items-center h-12 border-solid border-2 border-gray-600 w-5/6 rounded mx-auto">
        <label className=" flex justify-start ml-1 text-xl">
          {image && image.url ? (
            <Avatar className="avatar" size={30} src={image.url} />
          ) : imageLoading ? (
            <LoadingOutlined />
          ) : (
            <CameraOutlined />
          )}
          <input onChange={handleImage} type="file" accept="images/*" />
        </label>
        <section className="mr-1">
          <button
            className="text-white px-4 py-1 bg-blue-400 border-solid border-2 border-blue-600 text-center rounded-lg text-sm"
            type="submit"
            onClick={handlePost}
          >
            post
          </button>
        </section>
      </div>
    </div>
  );
};

export default ContentPost;
