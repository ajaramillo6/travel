import "./travel.css";
import Posts from "../../components/posts/Posts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

export default function Travel() {
  const[posts, setPosts] = useState([]);
  const[user, setUser] = useState("");

  const PF = "http://localhost:5000/images/";

  const {search} = useLocation();
  const location = useLocation();
  const author = location.search.split("=")[1];

  useEffect(()=> {
    const fetchPosts = async() => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data.sort((p1,p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  },[search])

  useEffect(()=> {
    const fetchUser = async() => {
      const res = await axios.get("/users/?user="+author);
        setUser(res.data[0]);
    }
    fetchUser();
  },[author])

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let setCats = [];
  for (let i=0; i < posts.length; i++){
    setCats.push(posts[i].loc);
  }

  const cats = setCats.filter(onlyUnique)

  return (
    <>
      <div className="travel">
        {user &&
          <div className="travelUserContainer">
            <div className="travelUserPicWrapper">
              <img className="travelUserPic" src={PF + user.profilePic} alt="" />
            </div>
            <span className="travelUserUsername">{user.username}'s posts</span>
            <span className="travelUserFavorites">Favorites</span>
            <span className="travelUserPostsCount">Number of posts: {posts.length}</span>
            <span className="travelUserContactText">
              Contact Me
            </span>
          </div>
        }
        
        <div className="travelUserPosts">
        {cats &&
            <div>
              {cats.map((cat, i)=>(
                <div>
                  <ul key={i}>
                <Link to={`/?cat=${cat}`}>
                  <li>{cat}</li>
                </Link>
                </ul>
                </div>
              ))}
            </div>
        }
          <Posts posts={posts} />
        </div> 
      </div>
    </>
  )
}
