import "./travel.css";
import Posts from "../../components/posts/Posts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Travel() {
  const[posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(()=> {
    const fetchPosts = async() => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])

  return (
    <>
      <div className="travel">
        <Posts posts={posts} />
      </div>
    </>
  )
}
