import "./post.css";
// import { format } from 'timeago.js';
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
              <div className="postCats">
                {post.categories.map((c)=> (
                  <span className="postCat">{c.name}</span>
                ))}
              </div>
              <span className="postTitle">{post.title}</span>
              {/* <span className="postDate">{format(post.createdAt)}</span> */}
          </div>
          <p className="postDesc">
            {post.desc}
          </p>
        </div>
      </Link>
    </div>
  )
}
