import "./travel.css";
import Posts from "../../components/posts/Posts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
      setPosts(res.data);
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

  return (
    <>
      <div className="travel">
        {user &&
          <div className="travelUserContainer">
            <img className="travelUserPic" src={PF + user.profilePic} alt="" />
            <span className="travelUserUsername">{user.username}'s posts</span>
            <span className="travelUserFavorites">Favorites</span>
            <span className="travelUserPostsCount">Number of posts: {posts.length}</span>
          </div>
        }
        <Posts posts={posts} />
      </div>
    </>
  )
}
