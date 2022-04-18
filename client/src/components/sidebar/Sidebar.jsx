import "./sidebar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sidebar() {

  const [cats, setCats] = useState([]);

  useEffect(()=> {
    const getCats = async() => {
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="/img/profile.jpg" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Incidunt tenetur voluptatum accusantium voluptas laudantium 
          dolorum esse modi cum facere!</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">PLACES</span>
        <ul className="sidebarList">
          {cats.map((cat)=>(
            <li className="sidebarListItem">{cat.name}</li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
        </div>
      </div>
    </div>
  )
}
