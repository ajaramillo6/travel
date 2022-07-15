import "./latestPosts.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function LatestPosts({ post }) {

  //Number formatting on likes
  function numberFormat(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
}

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
              <div>
                {post.postLikes.length > 0 && 
                <div className="latestLikesContainer">
                  <i className="latestLikeIcon fa-solid fa-heart"></i> 
                  <span className="latestLikeCount">{numberFormat(post.postLikes.length)}
                  {post.postLikes.length === 1 ? " like": " likes"}</span>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}