import "./sidebar.css";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";

export default function Sidebar({profile, bio, pinterest, instagram, facebook}) {

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
        <p>{bio}</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">PLACES</span>
        {/* <ul className="sidebarList">
          {cats.map((cat)=>(
            <Link className="link" to={`/?cat=${cat.loc}`}>
              <li className="sidebarListItem">{cat.loc}</li>
            </Link>
          ))}
        </ul> */}
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <a className="link" href={pinterest}>
            <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          </a>
          <a className="link" href={instagram}>
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          </a>
          <a className="link" href={facebook}>
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
