import "./topbar.css";
import { Link } from 'react-router-dom';
import SideNavbar from "../sideNavbar/SideNavbar";
import { useState, useContext, useEffect } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import MiniSearchbar from "../miniSearchbar/MiniSearchbar";

export default function Topbar() {

  const[showMiniSearch, setShowMiniSearch] = useState(false);
  const[posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const { user, theme } = useContext(Context);
  const {search} = useLocation();

  useEffect(()=> {
    const fetchPosts = async() => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data.sort((p1,p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  },[search])
      


    const handleMiniSearch = () => {
      setShowMiniSearch(!showMiniSearch);
    }

    const Search = (posts) => {
      return posts.filter((post)=>
        post.newDescWords.join().toLowerCase().includes(query) || 
        post.newDescWords.join().includes(query) || 
        post.title.toLowerCase().includes(query) || 
        post.loc.toLowerCase().includes(query) || 
        post.state.toLowerCase().includes(query) || 
        post.username.toLowerCase().includes(query) || 
        post.title.includes(query) || 
        post.loc.includes(query) || 
        post.state.includes(query) || 
        post.username.includes(query) ||
        post.postSection.map((section)=> section.newSectionWords).join().toLowerCase().includes(query) ||
        post.postSection.map((section)=> section.newSectionWords).join().includes(query) ||
        post.postSection.map((section)=> section.sectionHeader).join().toLowerCase().includes(query) ||
        post.postSection.map((section)=> section.sectionHeader).join().includes(query) ||
        post.postSection.map((section)=> section.sectionListTitle).join().toLowerCase().includes(query) ||
        post.postSection.map((section)=> section.sectionListTitle).join().includes(query) ||
        post.postSection.map((section)=> section.listWords).join().toLowerCase().includes(query) ||
        post.postSection.map((section)=> section.listWords).join().includes(query))
    }

  return (
    <>
    <div className="top" data-theme={theme}>
      <div className="topLeft">
        <SideNavbar />
      </div>
      <div className="topCenter">
        <div className="topLogoWrapper">
          <Link className="topListLogo" to="/">
            <span>Backpack</span>
          </Link>
        </div>
      </div>
      <div className="topCenterLogo">
        <div className="topLogoWrapper">
          <Link className="topListLogo" to="/">
            <span className="topListLogo">Backpack</span>
          </Link>
        </div>
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
              <MiniSearchbar 
                posts={Search(posts)} 
                setQuery={setQuery} 
                query={query} 
                handleMiniSearch={handleMiniSearch} 
                theme={theme} 
              />
            </div>
          }
          <i className="topSearchIcon fa-solid fa-magnifying-glass" onClick={handleMiniSearch}></i>
         
        </div>
        <Rightbar user={user} />
      </div>
    </div>
    </>
  )
}
