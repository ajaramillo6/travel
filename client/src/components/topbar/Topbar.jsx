import "./topbar.css";
import { Link } from 'react-router-dom';
import SideNavbar from "../sideNavbar/SideNavbar";
import { useState, useContext } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Context } from "../../context/Context";

export default function Topbar() {

    const[openAdmin, setOpenAdmin] = useState(false); 

    const { user } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleAdmin = () => {
        setOpenAdmin(!openAdmin);
    }

  return (
    <div className="top">
        <div className="topLeft">
            <SideNavbar />
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li><img className="topListLogo" src="/img/logo.png" alt="" /></li>
                <li>
                    <Link className="topListItem" to="/">Home</Link>
                </li>
                <li>
                    <Link className="topListItem" to="/about">About</Link>
                </li>
                <li className="topListItem">Travel</li>
                <li className="topListItem">Contact Me</li>
            </ul>
        </div>
        <div className="topCenterLogo">
            <img className="topListLogo" src="/img/logo.png" alt="" />
        </div>
        <div className="topRight">
                <div className="topIcons">
                    <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                        <i className="topIcon fa-brands fa-pinterest-square"></i>
                        <i className="topIcon fa-brands fa-instagram-square"></i>
                        <i className="topIcon fa-brands fa-facebook-square"></i>
                        <i className="topAdminIcon fa-solid fa-gear" onClick={handleAdmin}></i>
                </div>
                {openAdmin &&
                    <Rightbar handleAdmin={handleAdmin} user={user} PF={PF} />
                }
        </div>
    </div>
  )
}
