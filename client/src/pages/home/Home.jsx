import "./home.css";
import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import LatestPosts from "../../components/latestPosts/LatestPosts";

export default function Home() {
  const[posts, setPosts] = useState([]);
  const[buttonHover, setButtonHover] = useState(false);
  const [index, setIndex] = useState(0);
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

  const handleScroll = (direction) => {
    if(direction === "l") {
        setIndex(index !== 0 ? index-1 : posts.length-5)
    }
    if(direction === "r") {
        setIndex(index !== posts.length-5 ? index+1 : 0)
    }
}

  return (
    <>
      <Header />
      <div className="home">
        <span className="homeText">Latest Posts</span>
        <hr style={{width:'50%', 'textAlign':'center', 'marginLeft':'auto', 'marginRight':'auto', 'marginBottom': '380px'}}></hr>
        <div className="homePostsContainer" style={{transform:`translateX(${-14*index}vw)`}}>
            {posts.slice(0,8).map((post) => (
              <LatestPosts post={post} />
            ))}
        </div>
        <div onMouseOver={handleButton} onMouseLeave={handleButtonLeave}>
          <Link className="link" to="/travel">
            <div className="homeReadMore"> 
              Read More Posts 
              <i className={buttonHover ? "homePlane fa-solid fa-plane":"homePlaneHide fa-solid fa-plane"}></i>
            </div>
          </Link>
        </div>
        {index > 0 &&
        <div className="homePostsArrowLeft" style={{left: 0}} onClick = {()=>handleScroll("l")}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        }
        {index < posts.length - 5 &&
        <div className="homePostsArrowRight" style={{right: 0}} onClick = {()=>handleScroll("r")}>
          <i className="fa-solid fa-angle-right"></i>
        </div>
        }
      </div>
    </>
  )
}
