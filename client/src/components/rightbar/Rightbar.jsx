import "./rightbar.css";
import "../../index.css";
import { Context } from "../../context/Context";
import { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
// import {axiosInstance} from "../../config";
import axios from 'axios';

export default function Rightbar({user}) {

    const { dispatch, theme, switchTheme } = useContext(Context);

    const {search} = useLocation();

    const[posts, setPosts] = useState([]);
    const[openAdmin, setOpenAdmin] = useState(false); 
    const[openManageSubscription, setOpenManageSubscription] = useState(false);
    const[subscribersList, setSubscribersList] = useState([]);
    const[subscriptionEmail, setSubscriptionEmail] = useState("");
    const[subscriberId, setSubscriberId] = useState("");
    const[subscriberName, setSubscriberName] = useState("");

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        handleAdmin();
        window.location.replace("/login");
    }

    const handleAdmin = () => {
        setOpenAdmin(!openAdmin);
    }

    //Get all subscribers
    useEffect(()=> {
        const fetchSubscribers = async() => {
          const res = await axios.get("/subscribers");
          setSubscribersList(res.data.sort((a,b)=>
          a.subscriberName.localeCompare(b.subscriberName)
        ));
        }
        fetchSubscribers();
      },[openAdmin]);

      //Get all posts
      useEffect(()=> {
        const fetchPosts = async() => {
          const res = await axios.get("/posts" + search);
          setPosts(res.data.sort((p1,p2)=> {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
          }));
        }
        fetchPosts();
      },[search])

      const handleCancelSubscription = async() => {

        //Find matching subscriber
        // for(let i = 0; i < subscribersList.length; i++){
        //   if(subscribersList[i].subscriberEmail === subscriptionEmail){
        //       setSubscriberId(subscribersList[i]._id);
        //       setSubscriberName(subscribersList[i].subscriberName)
        //   }
        // }

        //Find all comments by subscriber and filter out
        // for(let p = 0; p < posts.length; p++){
        //   let postCommentsLength = posts[p].postComments.length;
        //   for(let c = 0; c < postCommentsLength; c++){
        //     if(posts[p].postComments[c].subscriberCommentName === subscriberName){
        //       posts[p].postComments.slice(0,c);
        //     }
        //   }
        // }

        //Send Delete Request
        try{
            await axios.delete(`/subscribers/${subscriberId}`);
            window.alert("Membership deleted. Sorry to see you go :(");
          }catch(err){
            console.log(err);
          }
          setOpenManageSubscription(false);
      }

    const handleOpenManageSubscription = () => {
        setOpenManageSubscription(!openManageSubscription);
    }

  return (
    <div data-theme={theme}>
    <Link className="link" to="#" onClick={handleAdmin}><i className="topAdminIcon fa-solid fa-gear" ></i></Link>
    <nav className={openAdmin ? "rightbarActive" : "rightbar"}>
            {user ? (
                <ul className="rightbarMenuItems">
                  <li className="rightbarToggle" onClick={handleAdmin}>
                    <Link className="link" to="#">
                      <i className="fa-solid fa-xmark"></i>
                    </Link>
                  </li>
                  <li className="rightbarImgSection">
                    <Link 
                      className="link" 
                      to="/settings" 
                      onClick={handleAdmin}>
                      <img 
                        className="rightbarImg" 
                        src={user.profilePic ? user.profilePic : "https://res.cloudinary.com/alvjo/image/upload/v1654190156/uploads/blank_avatar_v4pcno.jpg"} 
                        alt="" 
                      />
                    </Link> 
                  </li>
                  <li className="rightbarSection">
                    <Link
                      className="link" 
                      to="#" 
                      onClick={handleAdmin}>
                      <div className="rightSection" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="rightText">Logout</span>
                      </div>
                    </Link>
                  </li>
                  <li className="rightbarSection">
                    <Link 
                      className="link" 
                      to="/write" 
                      onClick={handleAdmin}>
                      <div className="rightSection">
                        <i className="fa-solid fa-pen"></i>
                        <span className="rightText">Write</span>
                      </div>
                    </Link> 
                  </li>
                  <li className="rightbarSection">
                    <Link 
                      className="link" 
                      to="#"
                      onClick={ switchTheme }>
                      <div className="rightSection">
                        {theme === 'lightTheme' ? 
                          <i className="fa-solid fa-sun"></i> : 
                          <i className="fa-solid fa-moon"></i>
                        }
                        <span className="rightText">
                          {theme === 'lightTheme' ? 
                            "Light Mode" : 
                            "Dark Mode"
                          }
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul> 
            ):(
            <>
                <ul className="rightbarMenuItems">
                    <li className="rightbarToggle" onClick={handleAdmin}>
                        <Link className="link" to="#">
                            <i className="fa-solid fa-xmark" style={{fontSize:"20px", cursor:"pointer"}}></i>
                        </Link>
                    </li>
                    <li className="rightbarSection">
                        <Link 
                            className="link" 
                            to="/login" 
                            onClick={handleAdmin}>
                            <div className="rightSection">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="rightText">Login</span>
                            </div>
                        </Link>
                    </li>
                    <li className="rightbarSection">
                        <Link 
                            className="link" 
                            to="#"
                            onClick={handleOpenManageSubscription}>
                            <div className="rightSection">
                                <i className="fa-solid fa-user-gear"></i>
                                <span className="rightText">Manage subscription</span>
                            </div>
                        </Link>
                    </li>
                    <li className="rightbarSection">
                        <Link 
                            className="link" 
                            to="#"
                            onClick={switchTheme}>
                            <div className="rightSection">
                            {theme === 'lightTheme' ? 
                                <i className="fa-solid fa-sun"></i> : 
                                <i className="fa-solid fa-moon"></i>
                              }
                              <span className="rightText">
                              {theme === 'lightTheme' ? 
                                "Light Mode" : 
                                "Dark Mode"
                              }
                              </span>
                            </div>
                        </Link>
                    </li>
                </ul>
                {openManageSubscription &&
                <div className="rightDeleteSubscriptionContainer">
                  <div className="rightDeleteSubscription">
                    <div className="rightDeleteTextTitle">
                      ARE YOU SURE YOU WANT TO DELETE YOUR SUBSCRIPTION?
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="rightbarInput" 
                      onChange={e=>setSubscriptionEmail(e.target.value)}
                      />
                    <div className="rightDeleteTextWrapper">
                      <div><i className="rightDeleteIcon fa-solid fa-triangle-exclamation"></i></div>
                      <div className="rightDeleteTextContainer">
                        <div className="rightDeleteText">
                          You are about to delete your membership subscription.
                        </div>
                        <div className="rightDeleteText">
                          Are you sure you want to continue?
                        </div>
                      </div>
                    </div>
                    <div className="rightDeleteOptions">
                      <div className="rightDeleteOption" onClick={handleOpenManageSubscription}>Cancel</div>
                      <div className="rightDeleteOption" onClick={handleCancelSubscription}>Continue</div>
                    </div>
                  </div>              
                </div>
                }
            </>
                
            )}
    </nav>
    </div>
  )
}
