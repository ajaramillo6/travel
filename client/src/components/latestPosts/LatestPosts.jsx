import "./latestPosts.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function LatestPosts({ post }) {

  const PF = "http://localhost:5000/images/";

  return (
    <div className="latestPost">
      <Link to={`/post/${post._id}`}  className="link">
        <div>
        {post.photo && (
          <img className="latestPostImg" src={PF + post.photo} alt="" />
        )}
          <div className="lastestPostInfo">
              <span className="latestPostTitle">{post.title}</span>
              <div className='latestPostUserDate'>
                <span className="latestPostUser">{post.username}</span>
                <span className="latestPostDate">{format(post.createdAt)}</span>
              </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
