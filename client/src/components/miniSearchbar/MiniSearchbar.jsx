import "./miniSearchbar.css";
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

export default function MiniSearchbar({posts, setQuery}) {

    const PF = "http://localhost:5000/images/";

  return (
    <div className="miniSearchbar">
        <div className="miniSearchbarBarActive">
            <input 
                type="text" 
                placeholder="Search" 
                className="miniSearch" 
                autoFocus={true} 
                onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
        <div className="miniSearchPostsList">
        <hr />
        {posts.map((post, i)=>(
              <div>
                <div key={i}>
                <Link className="link" to={`/post/${post._id}`}>
                    <div className="miniSearchPostsWrapper">
                      <div className="miniSearchPostPicContainer">
                        <img className="miniSearchPostPic" src={PF + post.photo} alt="" />
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
        </div>
    </div>
  )
}
