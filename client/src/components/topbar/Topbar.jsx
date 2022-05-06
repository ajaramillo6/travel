import "./topbar.css";
import { Link } from 'react-router-dom';
import SideNavbar from "../sideNavbar/SideNavbar";
import { useState, useContext, useEffect } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MiniSearchbar from "../miniSearchbar/MiniSearchbar";

export default function Topbar() {

    const[openAdmin, setOpenAdmin] = useState(false); 
    const[showMiniSearch, setShowMiniSearch] = useState(false);
    const[posts, setPosts] = useState([]);
    const [query, setQuery] = useState("");

    const { user } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    
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
      
    const handleAdmin = () => {
        setOpenAdmin(!openAdmin);
    }

    const handleMiniSearch = () => {
      setShowMiniSearch(!showMiniSearch);
    }

    const keys = ["title", "desc", "loc", "username"];
    const Search = (posts) => {
        return posts.filter((post)=>
            keys.some((key)=>post[key].toLowerCase().includes(query) || 
            post[key].includes(query)))
    }

  return (
    <>
    <div className="top">
      <div className="topLeft">
        <SideNavbar />
      </div>
      <div className="topCenter">
        <img className="topListLogo" src="/img/logo.png" alt="" />
      </div>
      <div className="topCenterLogo">
        <img className="topListLogo" src="/img/logo.png" alt="" />
      </div>
      <div className="topRight">
        <ul className="topList">
          <li>
            <Link className="topListItem" to="/">Home</Link>
          </li>
          <li>
            <Link className="topListItem" to="/about">Team</Link>
          </li>
          <li>
            <Link className="topListItem" to="/travel">Travel</Link>
          </li>
        </ul>
        <div className="topIcons">
          {showMiniSearch &&
            <div className="topMiniSearchbar">
              <MiniSearchbar posts={Search(posts)} setQuery={setQuery} query={query} handleMiniSearch={handleMiniSearch} />
            </div>
          }
          <i class="topSearchIcon fa-solid fa-magnifying-glass" onClick={handleMiniSearch}></i>
          <i className="topAdminIcon fa-solid fa-gear" onClick={handleAdmin}></i>
        </div>
        {openAdmin &&
          <Rightbar handleAdmin={handleAdmin} user={user} PF={PF} />
        }
      </div>
    </div>
    </>
  )
}
