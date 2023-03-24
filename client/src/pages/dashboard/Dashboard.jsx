import { useState, useEffect } from 'react'
import axios from 'axios'
import "./Dashboard.css"
import RouteUser from "../../routes/RouteUser"
import ContentPost from "../posts/ContentPost"
import { toast } from 'react-toastify'
import { useContextHook } from '../../components/context/ContextAPI'
import PostList from '../../components/postlist/PostList'

const Dashboard = () => {
  const {user, token} = useContextHook()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [imageLoading, setImageLoading] = useState(false)

  const handlePost = async(e)=>{
    e.preventDefault()
try {
  const {data} = await axios.post(`/create-post`, {
      content,
      image
  })
  console.log(data);
  if(data.err){
      toast.error(data.err)
  }
  else{
    toast.success("posted")
    setContent("")
    setImage({})
  }
  fetchPost()
}

catch (error) {
  console.log(error);
}
}

useEffect(()=>{
  if(user && user.token) fetchPost()
},[user && user.token])

const fetchPost = async()=>{
  try {
    const {data} = await axios.get(`/user-posts`)
    setPosts(data)
  console.log(data);
  } catch (error) {
    console.log(error);
  }
  
}

const handleImage = async(e)=>{
  const file = e.target.files[0]
  let formData = new FormData()
  formData.append("image", file)
  console.log([...formData]);
  setImageLoading(true)
  try {
    const {data} = await axios.post(`/image-upload`, formData)
    // console.log("uploaded image=>",data)
    const {public_id, url} = data
    setImage({
      url,
      public_id
    })
    setImageLoading(false)
  } catch (error) {
    console.log(error);
    setImageLoading(false)
  }
}
// console.log(image)
return (
  <RouteUser>
    <div className="dashboard">
    <h1>dashBOARD</h1> 
    <ContentPost
    handlePost={handlePost}
    content={content}
    setContent={setContent}
    // posts={posts}
    image={image}
    imageLoading={imageLoading}
    handleImage={handleImage}
    />
    <div>
      <PostList posts={posts}/>
    </div>
    <aside className="aside">Aside</aside>
    </div>
    </RouteUser>
  )
}

export default Dashboard