import "./miniSearchbar.css";
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

export default function MiniSearchbar({posts, query, setQuery, handleMiniSearch}) {

    const handleSearch = () => {
      setQuery("");
      handleMiniSearch();
    }

  return (
    <div className="miniSearchbar">
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
                              <div className="miniSearchPostDate">{format(post.createdAt)}</div>
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
