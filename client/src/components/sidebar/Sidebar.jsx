import "./sidebar.css";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";

export default function Sidebar({profile}) {

  const [cats, setCats] = useState([]);
  
  const PF = "http://localhost:5000/images/";

  const {user} = useContext(Context);

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
        <span className="sidebarTitle">ABOUT AUTHOR</span>
        <img src={profile} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Incidunt tenetur voluptatum accusantium voluptas laudantium 
          dolorum esse modi cum facere!</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">PLACES</span>
        <ul className="sidebarList">
          {cats.map((cat)=>(
            <Link className="link" to={`/?cat=${cat.name}`}>
              <li className="sidebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <a className="link" href="https://www.pinterest.com/megandunnavant/_saved/">
            <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          </a>
          <a className="link" href="https://www.instagram.com/megglygweggly/?hl=en">
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          </a>
          <a className="link" href="https://www.facebook.com/profile.php?id=100008509874105">
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
