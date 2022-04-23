import "./post.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function Post({ post }) {

  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <Link to={`/post/${post._id}`}  className="link">
        <div>
        {post.photo && (
          <img className="postImg" src={PF + post.photo} alt="" />
        )}
          <div className="postInfo">
              <div className="postCats">
                {post.categories.map((c)=> (
                  <span className="postCat">{c.name}</span>
                ))}
              </div>
              <span className="postTitle">{post.title}</span>
              <div className='postUserDate'>
                <span className="postUser">{post.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
          </div>
          <p className="postDesc">
            {post.desc}
          </p>
        </div>
      </Link>
    </div>
  )
}
