import "./singlePost.css";
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Context } from "../../context/Context";
import Sidebar from "../sidebar/Sidebar";
import PostSection from "../postSection/PostSection";

export default function SinglePost() {

  const[post, setPost] = useState({});
  const[title, setTitle] = useState("");
  const[desc, setDesc] = useState("");
  const[loc, setLoc] = useState("");
  const[state, setState] = useState("");
  const[updateMode, setUpdateMode] = useState(false);
  const[users, setUsers] = useState([]);
  const[showSidebar, setShowSidebar] = useState(true);

  const { user } = useContext(Context);

  const PF = "http://localhost:5000/images/"

  const location = useLocation()
  const path = location.pathname.split("/")[2];

  useEffect(()=> {
    const getPost = async() => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLoc(res.data.loc);
      setState(res.data.state);
    }
    getPost();
  },[path])

  const handleDelete = async() => {
    try{
      await axios.delete(`/posts/${post._id}`, {
        data: {
          username: user.username, 
        },
      });
      window.location.replace("/")
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdate = async() => {
    try{
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        loc,
        state,
      });
      setUpdateMode(false);
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdateCancel = () => {
    setUpdateMode(!updateMode);
  }
  
  //Search for Users to compare with Author info
  useEffect(()=> {
    const fetchUsers = async() => {
      const res = await axios.get("/users");
      setUsers(res.data);
    }
    fetchUsers();
  },[])

  const userList = [];
  for(let i=0; i < users.length; i++){
    if(users[i].username === post.username){
      userList.push([users[i].username, users[i].profilePic])
    }
  }

  const postProfile = [];
  if(post.profilePic !== undefined){
    JSON.stringify(postProfile.push(post.profilePic.split("/")[4]));
  }

  const compareProfile = []
  if(userList[0] !== undefined){
    if(userList[0][1] !==undefined){
      JSON.stringify(compareProfile.push(userList[0][1]));
    }
  }

  const handleOpenSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
    <div className="singlePost">
        <div className={showSidebar ? "singlePostWrapper":"singlePostWrapperFill"}>
          {post.photo &&
            <img className="singlePostImg" src={PF+post.photo} alt="" />
          }
          {
            updateMode ? 
            <div className="singlePostTitleInputContainer">
              <input 
                type="text" 
                value={title} 
                className="singlePostTitleInput" 
                onChange={(e)=>setTitle(e.target.value)}
                autofocus
              /> 
              <input 
                type="text" 
                value={loc} 
                className="singlePostLocInput" 
                onChange={(e)=>setLoc(e.target.value)}
              /> 
              {post.state !== "" &&
              <input 
                type="text" 
                value={state} 
                className="singlePostStateInput" 
                onChange={(e)=>setState(e.target.value)}
              /> 
              }
            </div>
          : (
            <div className="singlePostTitleContainer">
              <div className="singlePostLocationsContainer">
                <div className="singlePostCatWrapper">
                  <Link className="link" to={`/travel/?cat=${loc}`}>
                    <div className="singlePostCat">{loc}</div>
                  </Link>
                </div>
                <div className="singlePostStateWrapper">
                  {post.state !== "" &&
                    <Link className="link" to={`/travel/?state=${state}`}>
                      <div className="singlePostState">{state}</div>
                    </Link>
                  }
                </div>
              </div>
              <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username &&
                  <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                  </div>
                }
              </h1>
            </div>
          )}
          <div className="singlePostInfo">
          <Link className="link" to={`/travel/?user=${post.username}`}>
            <div className="singlePostAuthor">
                <img className="singlePostProfile" src={PF + compareProfile} alt="" />
                <b>Author: {post.username}</b>
            </div>
          </Link>
          <span className="singlePostDate">{format(post.createdAt)}</span>
          </div>
          {updateMode ? 
            <textarea 
              className="singlePostDescInput" 
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
            /> 
          :(
            <p className="singlePostDesc">{desc}</p>
          )}
          <PostSection post={post} />
          {updateMode &&
          <div className="singlePostButtons">
            <button 
              className="singlePostButton"
              onClick={handleUpdateCancel}>
              Cancel
            </button>
            <button 
              className="singlePostButton" 
              onClick={handleUpdate}>
              Update
            </button>
          </div>
          }
        </div>
        <div className="sidebar">
          {showSidebar ? (
            <div className="sidebarShow">
              <i className="sidebarIcon fa-solid fa-angle-right" onClick={handleOpenSidebar}></i>
              <Sidebar 
                post={post}
                compareProfile={compareProfile}
                profile={post.profilePic} 
                pinterest={post.pinterest} 
                instagram={post.instagram} 
                facebook={post.facebook} 
                author={post.username}
              />
            </div>
          ):(
            <div className="sidebarShow">
              <i className="sidebarIcon fa-solid fa-angle-left" onClick={handleOpenSidebar}></i>
            </div>
          )}
        </div>
  </div>
  </>
  )
}
