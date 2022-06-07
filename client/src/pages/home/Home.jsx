import "./home.css";
import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import LatestPosts from "../../components/latestPosts/LatestPosts";

export default function Home() {
  const[posts, setPosts] = useState([]);
  const[buttonHover, setButtonHover] = useState(false);
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

  const handleButton = () => {
    setButtonHover(true);
  }

  const handleButtonLeave = () => {
    setButtonHover(false);
  }

  return (
    <>
      <Header />
      <div className="home">
        <span className="homeText">Latest Posts</span>
        <hr style={{width:'50%', 'textAlign':'center', 'marginLeft':'auto', 'marginRight':'auto', 'marginBottom': '10px'}}></hr>
        <div className="homePostsContainer">
            {posts.slice(0,8).map((post) => (
              <LatestPosts post={post} />
            ))}
        </div>
        <div onMouseOver={handleButton} onMouseLeave={handleButtonLeave}>
          {!buttonHover ?
            <Link className="homeReadMore" to="/travel">Read More Posts</Link>:
            <Link className="homeReadMoreHide" to="/travel">Read More Posts <i className="homePlane fa-solid fa-plane"></i></Link>
          }
        </div>
      </div>
    </>
  )
}
