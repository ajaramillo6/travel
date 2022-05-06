import "./home.css";
import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LatestPosts from "../../components/latestPosts/LatestPosts";

export default function Home() {
  const[posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(()=> {
    const fetchPosts = async() => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data.sort((p1,p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  },[search])

  return (
    <>
      <Header />
      <div className="home">
        <span className="homeText">Latest Posts</span>
        <hr style={{width:'50%', 'textAlign':'center', 'marginLeft':'auto', 'marginRight':'auto'}}></hr>
        <div className="homePostsContainer">
            {posts.slice(0,6).map((post) => (
              <LatestPosts post={post} />
            ))}
        </div>
      </div>
    </>
  )
}
