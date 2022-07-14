import "./home.css";
import Header from "../../components/header/Header";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
// import { axiosInstance } from "../../config";
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";
import LatestPosts from "../../components/latestPosts/LatestPosts";
import HomeAbout from "../../components/homeAbout/HomeAbout";

export default function Home() {

  const { theme } = useContext(Context);

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
    <div data-theme={theme}>
      <Header />
      <div className="home">
        <span className="homeText">Latest Posts</span>
        <hr className="homeHr" style={{width:'50%', 'textAlign':'center', 'marginBottom': '400px'}}></hr>
        <div className="homePostsContainer" style={{transform:`translateX(${-280*index}px)`}}>
            {posts.slice(0,8).map((post) => (
              <LatestPosts post={post} />
            ))}
        </div>
        <div onMouseOver={handleButton} onMouseLeave={handleButtonLeave}>
          <Link className="link" to="/travel">
            <div className="homeReadMore"> 
              View All Posts 
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
        <HomeAbout theme={theme} />
      </div>
    </div>
  )
}
