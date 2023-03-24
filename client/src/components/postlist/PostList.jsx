import './PostList.css'
import { Avatar } from 'antd'
import moment from "moment"

const PostList = ({posts}) => {
  return (
    <div className='post-container'>
         {
        posts && posts.map(post=>{
          console.log(post);
          return <div className='single-post' key={post._id}>
            <header className="header">
              <Avatar className='header-image'>
              {post.postedBy.name[0]}
              </Avatar>
               <span className='header-name'>{post.postedBy.name}</span>
               <span className='header-time'>{moment(post.created).fromNow()}</span>
            </header>
            <main className="content">
              <p className='post-content'>{post.content}</p>
            </main>
            <div className='footer'>
            {
              post.image && <div style={{
                backgroundImage: "url(" + post.image.url + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                height: "200px"
              }}>

              </div>
            }
              <section>likes unlikes comments</section>
              </div>
          </div>
        })
      }
    </div>
  )
}

export default PostList