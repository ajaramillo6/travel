import "./travel.css";
import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../../config";
import { useLocation, Link } from "react-router-dom";
import Dropdown from "../../components/dropdown/Dropdown";
import Posts from "../../components/posts/Posts";
import emailjs from 'emailjs-com';

export default function Travel() {
  const[posts, setPosts] = useState([]);
  const[user, setUser] = useState("");
  const[showDropdown, setShowDropdown] = useState(false);
  const [goingUp, setGoingUp] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

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

  const {search} = useLocation();
  const location = useLocation();
  const author = location.search.split("=")[1];

  useEffect(()=> {
    const fetchPosts = async() => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data.sort((p1,p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  },[search])

  useEffect(()=> {
    const fetchUser = async() => {
      const res = await axiosInstance.get("/users/?user="+author);
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

  const handleEmailShow = () => {
    setShowEmail(!showEmail)
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_aagbgqd', 'template_c406s8l', e.target, 'user_KBdCFErbshzn0SBde49T7')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
      window.location.replace("/travel/?user=" + user.username)
  }

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
            <span className="travelUserPostsLikes">Likes count: {posts.map(a=>a.postLikes.length)
              .reduce((partialSum, a) => partialSum + a, 0)}</span>
            <span className="travelUserContactText" onClick={handleEmailShow}>
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
      {showEmail &&
            <div className="travelContactMe">
              <div className="travelContactMeWrapper">
                <i className="travelContactMeClose fa-solid fa-circle-xmark fa-xl" onClick={()=>setShowEmail(false)}></i>
                <span className="travelContactMeHeader">Send message to <span className="travelContactMeHeaderUser">{user.username}</span></span>
                  <form className="travelContactForm" onSubmit={sendEmail}>
                    <div><input className="travelContactFormSubject" type="text" placeholder="Your Name" name="subject" required minLength="3" maxLength="30" /></div>
                    <br></br>
                    <div><input className="travelContactFormEmail" type="text" placeholder="Your Email" name="email" /></div>
                    <br></br>
                    <div><textarea className="travelContactFormMessage" name="message" cols="30" rows="5" placeholder="Your Message" /></div>
                    <br></br>
                    <div><input className="travelContactFormSubmit" type="submit" value="SEND" /></div>
                  </form>
              </div>
            </div>
      }
    </>
  )
}
