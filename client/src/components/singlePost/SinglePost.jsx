import "./singlePost.css";
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Context } from "../../context/Context";
import Sidebar from "../sidebar/Sidebar";

export default function SinglePost() {

  const[post, setPost] = useState({});
  const[title, setTitle] = useState("");
  const[desc, setDesc] = useState("");
  const[updateMode, setUpdateMode] = useState(false);

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
      });
      setUpdateMode(false);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo &&
            <img className="singlePostImg" src={PF+post.photo} alt="" />
          }
          {
            updateMode ? 
              <input 
                type="text" 
                value={title} 
                className="singlePostTitleInput" 
                onChange={(e)=>setTitle(e.target.value)}
                autofocus
              /> 
          : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username &&
                <div className="singlePostEdit">
                  <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                  <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
              }
            </h1>
          )}
          <div className="singlePostInfo">
          <Link className="link" to={`/?user=${post.username}`}>
            <div className="singlePostAuthor">
                <img className="singlePostProfile" src={post.profilePic} alt="" />
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
          {updateMode &&
            <button 
              className="singlePostButton" 
              onClick={handleUpdate}>
              Update
            </button>
          }
        </div>
        <div className="sidebar">
          <Sidebar profile={post.profilePic}/>
        </div>
  </div>
    </>
  )
}
