import "./singlePost.css";
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';
// import { format } from 'timeago.js';

export default function SinglePost() {

  const[post, setPost] = useState({});

  const location = useLocation()
  const path = location.pathname.split("/")[2];

  useEffect(()=> {
    const getPost = async() => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
    }
    getPost();
  },[path])

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo &&
            <img className="singlePostImg" src={post.photo} alt="" />
          }
          <h1 className="singlePostTitle">
            {post.title}
            <div className="singlePostEdit">
              <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
              <i className="singlePostIcon fa-solid fa-trash"></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author: <b><Link className="link" to={`/?user=${post.username}`}>{post.username}</Link></b>
            </span>
            {/* <span className="singlePostDate">{format(post.createdAt)}</span> */}
          </div>
          <p className="singlePostDesc">{post.desc}</p>
        </div>
    </div>
  )
}
