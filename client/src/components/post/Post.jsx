import "./post.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function Post({ post }) {

  return (
    <div className="post">
      <Link to={`/post/${post._id}`}  className="link">
        <div>
        {post.photo && (
          <img className="postImg" src={post.photo} alt="" />
        )}
          <div className="postInfo">
              <span className="postTitle">{post.title}</span>
              <div className='postUserDate'>
                <span className="postUser">{post.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
          </div>
          <div className="postDesc">
            {post.newDescWords}
          </div>
        </div>
      </Link>
    </div>
  )
}
