import "./travel.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Dropdown from "../../components/dropdown/Dropdown";
import Posts from "../../components/posts/Posts";

export default function Travel() {
  const[posts, setPosts] = useState([]);
  const[user, setUser] = useState("");
  const[showDropdown, setShowDropdown] = useState(false);
  const [goingUp, setGoingUp] = useState(true);

  const handleDropdown = (cat) => {
    if(cat === "United States"){
      setShowDropdown(!showDropdown)
    } else if (cat !== "United States"){
      setShowDropdown(false)
    }
  }

  const handleDropdownLeave = () => {
      setShowDropdown(!showDropdown)
  }

  //Hide on scroll
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

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

  //Find locations from posts
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let setCats = [];
  for (let i=0; i < posts.length; i++){
    setCats.push(posts[i].loc);
  }

  const cats = setCats.filter(onlyUnique).sort();

  let setStates = [];
  for(let i=0; i < posts.length; i++){
    if(posts[i].state !== ""){
      setStates.push(posts[i].state);
    }
  }

  const states = setStates.filter(onlyUnique).sort();

  return (
    <>
      <div className="travel">
        {user &&
          <div className="travelUserContainer">
            <div className="travelUserPicWrapper">
              <img className="travelUserPic" src={user.profilePic} alt="" />
            </div>
            <span className="travelUserUsername">{user.username}'s posts</span>
            <span className="travelUserPostsCount">Number of posts: {posts.length}</span>
            <span className="travelUserFavorites">Favorites</span>
            <span className="travelUserContactText">
              Contact Me
            </span>
            <div className="travelSocialContainer">
              <a className={user.pinterest !== "" ? "link":"noLink"} href={user.pinterest}>
                <i className="travelSocialIcon fa-brands fa-pinterest-square"></i>
              </a>
              <a className={user.instagram !== "" ? "link":"noLink"} href={user.instagram}>
                <i className="travelSocialIcon fa-brands fa-instagram-square"></i>
              </a>
              <a className={user.facebook !== "" ? "link":"noLink"} href={user.facebook}>
                <i className="travelSocialIcon fa-brands fa-facebook-square"></i>
              </a>
            </div>
          </div>
        }
        <div className="travelUserPosts">
        {goingUp &&
        <>
            <div className="travelCats">
              {cats.map((cat, i)=>(
                <>
                  <div key={i}>
                    <Link className="link" to={`/travel/?cat=${cat}`}>
                      <div 
                        className="travelCat" 
                        onMouseEnter={()=>handleDropdown(cat)}
                        >
                        {cat}
                      </div>
                    </Link>
                  </div>
                  <div className={!showDropdown && "hideDropdown"} onMouseLeave={handleDropdownLeave}>
                    <Dropdown cat={cat} states={states} />
                  </div>
                </>
              ))}
            </div>
        </>
        }
          <Posts posts={posts} />
        </div> 
      </div>
    </>
  )
}
