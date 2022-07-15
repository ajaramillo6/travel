import "./miniSearchbar.css";
import { Link } from 'react-router-dom';

export default function MiniSearchbar({posts, query, setQuery, handleMiniSearch, theme}) {

    const handleSearch = () => {
      setQuery("");
      handleMiniSearch();
    }

    //Format date
function timeSince(date) {

  const seconds = Math.floor((date) / 1000);
  console.log(seconds)
  const interval = seconds / 31536000;

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
    <div className="miniSearchbar" data-theme={theme}>
      <div className={query.length < 2 ? "miniSearchbarBar" : "miniSearchbarBarActive"}>
        <input 
          type="text" 
          placeholder="Search" 
          className="miniSearch" 
          autoFocus={true} 
          onChange={(e)=>setQuery(e.target.value)}
        />
        <div className="miniSearchPostsList">
          <hr />
          {query.length >=2 && 
            <>
            {posts.length !== 0 ? (
              <>
              {posts.map((post, i)=>(
                    <div>
                      <div key={i}>
                      <Link className="link" to={`/post/${post._id}`} onClick={handleSearch}>
                          <div className="miniSearchPostsWrapper">
                            <div className="miniSearchPostPicContainer">
                              <img className="miniSearchPostPic" src={post.photo} alt="" />
                            </div>
                            <div className="miniSearchPostContainer">
                              <div className="miniSearchPostTitle">{post.title}</div>
                              <div className="miniSearchPostAuthor">{post.username}</div>
                              <div className="miniSearchPostDate">{timeSince(new Date(Date.now())-new Date(post.createdAt))}</div>
                            </div>
                          </div>
                      </Link>
                      </div>
                    </div>
              ))}
              </>
            ):(
              <div className="miniSearchPostsEmpty">{"No results found. Try again."}</div>
            )}
            </>
          }
        </div>
      </div>
    </div>
  )
}
