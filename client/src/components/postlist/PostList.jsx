import "./PostList.css";
import { Avatar } from "antd";
import moment from "moment";
import {
  EditOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContextHook } from "../context/ContextAPI";
import { Link, useParams } from "react-router-dom";

const PostList = ({ posts, handleDelete }) => {
  const { user } = useContextHook();

  const { postId } = useParams();

  return (
    <div className="w-5/6">
      {posts &&
        posts.map((post) => {
          // console.log(post);
          return (
            <div
              className="my-2 border-solid border-2 border-gray-400 rounded"
              key={post._id}
            >
              <header className="flex justify-around items-center border-solid border-2 border-gray-400 h-14">
                <Avatar className="">{post.postedBy.name[0]}</Avatar>
                <span className="text-lg font-bold">{post.postedBy.name}</span>
                <span className="text-xs font-semibold">
                  {moment(post.created).fromNow()}
                </span>
              </header>
              <main className="content">
                <p className="post-content">{post.content}</p>
              </main>
              <div className="footer">
                {post.image && (
                  <div
                    style={{
                      backgroundImage: "url(" + post.image.url + ")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      height: "200px",
                    }}
                  ></div>
                )}
                <section className="content-crud">
                  <HeartOutlined className="like" />
                  <CommentOutlined className="comment" />

                  <Link to={`/${post._id}`}>
                    <EditOutlined className="edit" />
                  </Link>
                  <DeleteOutlined
                    className="delete"
                    onClick={() => handleDelete(post)}
                  />
                </section>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
