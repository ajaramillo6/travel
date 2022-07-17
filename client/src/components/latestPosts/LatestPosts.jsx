import "./latestPosts.css";
import { Link } from "react-router-dom";

export default function LatestPosts({ post }) {

  //Number formatting on likes
  function numberFormat(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
}

//Format date
function timeSince(date) {

  let seconds = Math.floor((date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + " weeks ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
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
                <span className="latestPostDate">{timeSince(new Date(Date.now())-new Date(post.createdAt))}</span>
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
