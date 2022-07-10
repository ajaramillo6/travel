import "./singlePost.css";
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
// import { axiosInstance } from "../../config";
import axios from 'axios';
import { format } from 'timeago.js';
import { Context } from "../../context/Context";
import Sidebar from "../sidebar/Sidebar";
import PostSection from "../postSection/PostSection";
import Subscribe from "../subscribe/Subscribe";

export default function SinglePost() {

  const[post, setPost] = useState({});
  const[title, setTitle] = useState("");
  const[newDescWords, setNewDescWords] = useState("");
  const[loc, setLoc] = useState("");
  const[state, setState] = useState("");
  const[updateMode, setUpdateMode] = useState(false);
  const[users, setUsers] = useState([]);
  const[showSidebar, setShowSidebar] = useState(true);
  const { user, theme } = useContext(Context);

  const location = useLocation()
  const path = location.pathname.split("/")[2];

  useEffect(()=> {
    const getPost = async() => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setNewDescWords(res.data.newDescWords);
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
        newDescWords,
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

  //************/CREATE LINKS IN DESC AREA

  const findUrls = [];
  const findIndex = [];
  const createLinks = [];
  const postLinks = [];
  const newPostText = [];
  const newPostWords = [];

  //Find URLS in newDescWords
  for(let i = 0; i < newDescWords.length; i++){
    if(newDescWords[i][0] === "["){
      findUrls.push(newDescWords[i]);
      findIndex.push(i);
    }
  }

  for(let j = 0; j < findUrls.length; j++){
    if(findUrls[j].includes(",")){
      createLinks.push(<a className="postLink" href={findUrls[j].split(",")[0].substring(1).slice(0,-1)}>
        {(findUrls[j].split(",")[1].slice(0,-1).slice(0,-1)).split("-").join(" ")}</a>);
    }
  }

  for(let x = 0; x < createLinks.length; x++){
    postLinks.push([findIndex[x], createLinks[x]]);
  }

  //Insert link objects as replacement for square bracket content
  for (let w = 0; w < postLinks.length; w++){
    newPostText.push(newDescWords[postLinks[w][0]] = postLinks[w][1]);
  }

  //Create space between words, except if they're objects. Add period if object at end of sentence
  for(let x = 0; x < newDescWords.length; x++){
    if(typeof newDescWords[x-1] === 'object' && typeof newDescWords[x] !== 'object' && 
    (newDescWords[x][0].toUpperCase() === newDescWords[x][0])){
      newPostWords.push(". " + newDescWords[x]);
    } else if (typeof newDescWords[x-1] === 'object'){
      newPostWords.push(" " + newDescWords[x]);
    } else {
      newPostWords.push(newDescWords[x]);
    }
  }

  const tableOfContents = [];
  if(post.postSection){
    for(let x = 0; x < post.postSection.length; x++){
      if(post.postSection[x].sectionHeader !== ''){
        tableOfContents.push(post.postSection[x].sectionHeader);
      }
    }
  }

  return (
    <>
    <div className="singlePost" data-theme={theme}>
        <div className={showSidebar ? "singlePostWrapper":"singlePostWrapperFill"}>
          {post.photo &&
            <img className="singlePostImg" src={post.photo} alt="" />
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
                    {/* <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i> */}
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                  </div>
                }
              </h1>
            </div>
          )}
          <div className="singlePostInfo">
          <Link className="link" to={`/travel/?user=${post.username}`}>
            <div className="singlePostAuthor">
                <img className="singlePostProfile" src={compareProfile} alt="" />
                <b>Author: {post.username}</b>
            </div>
          </Link>
          <span className="singlePostDate">{format(post.createdAt)}</span>
          </div>
          {updateMode ? 
            <textarea 
              className="singlePostDescInput" 
              value={newDescWords}
              onChange={(e)=>setNewDescWords(e.target.value)}
            /> 
          :(
            <>
            {newPostWords ?
              <div className="singlePostDesc">{newPostWords}</div>:
              <div className="singlePostDesc">{newDescWords}</div>
            }
            </>
          )}
          <PostSection post={post} tableOfContents={tableOfContents} theme={theme} />
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
          <div 
            className="backToTop" 
            onClick={()=>window.scrollTo({top:0, left: 0, behavior: 'smooth'})}>
              <i className="backToTopIcon fa-solid fa-angle-up"></i>
          </div>
          <Subscribe post={post} theme={theme} />
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
                theme={theme}
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
