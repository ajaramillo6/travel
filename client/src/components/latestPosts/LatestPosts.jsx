import "./latestPosts.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function LatestPosts({ post }) {

  return (
    <div className="latestPost">
      <Link to={`/post/${post._id}`}  className="link">
        <div>
        {post.photo && (
          <img className="latestPostImg" src={post.photo} alt="" />
        )}
          <div className="lastestPostInfo">
            <div className="lastestPostInfoWrapper">
              <span className="latestPostTitle">{post.title}</span>
              <div className='latestPostUserDate'>
                <span className="latestPostUser">{post.username}</span>
                <span className="latestPostDate">{format(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
