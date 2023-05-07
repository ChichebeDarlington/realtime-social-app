import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RouteUser from "../../routes/RouteUser";
import ContentPost from "../posts/ContentPost";

// console.log(useParams())

const EditPost = () => {
  const navigate = useNavigate();

  const [edit, setEdit] = useState({});
  const { postId } = useParams();
  // states
  const [imageLoading, setImageLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data } = await axios(`/${postId}`);
      console.log(data);
      setEdit(data);
      setContent(data.content);
      setImage(data.image.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    setImageLoading(true);
    try {
      const { data } = await axios.post(`/image-upload`, formData);
      // console.log("uploaded image=>",data)
      const { public_id, url } = data;
      setImage({
        url,
        public_id,
      });
      setImageLoading(false);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(`/post-edit/${postId}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("updated");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("updated", image, content);
  };
  return (
    <RouteUser>
      <div className="dashboard">
        <ContentPost
          handlePost={handlePost}
          content={content}
          setContent={setContent}
          image={image}
          // imageLoading={imageLoading}
          handleImage={handleImage}
        />
        {/* <div>
      <PostList posts={posts}/>
    </div> */}
      </div>
    </RouteUser>
  );
};

export default EditPost;
