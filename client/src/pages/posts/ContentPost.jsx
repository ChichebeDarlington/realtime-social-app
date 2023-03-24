import { toast } from 'react-toastify'
import  './ContentPost.css'
import {Avatar} from "antd"
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';

const ContentPost = ({content, setContent, handlePost, handleImage, image, imageLoading}) => {

  return (
    <div className='post-container'>
        <form>
            <textarea name="" id="" value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
        </form>
        {/* <div className="post-content">  */}
       <label>
       {
          image && image.url ? (<Avatar size={30} src={image.url}/>): imageLoading ? (<LoadingOutlined/>):(<CameraOutlined/>)
        }
        <input hidden onChange={handleImage} type="file" accept='images/*'/> 
        </label>        
        {/* </div> */}
        <section>
            <button className='post-btn' type='submit' onClick={handlePost}>post</button>
        </section>
    </div>
  )
}

export default ContentPost