import "./topbar.css";
import { Link } from 'react-router-dom';
import SideNavbar from "../sideNavbar/SideNavbar";
import { useState, useContext, useEffect, useRef } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Context } from "../../context/Context";

export default function Topbar() {

    const[openAdmin, setOpenAdmin] = useState(false); 
    const [goingUp, setGoingUp] = useState(true);

    const { user } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          if (prevScrollY.current < currentScrollY && goingUp) {
            setGoingUp(false);
          }
          if (prevScrollY.current > currentScrollY && !goingUp) {
            setGoingUp(true);
          }
          prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
      }, [goingUp]);
      
    const handleAdmin = () => {
        setOpenAdmin(!openAdmin);
    }

  return (
    <>
    {goingUp &&
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
                    <Link className="topListItem" to="/about">Team</Link>
                </li>
                <li>
                    <Link className="topListItem" to="/travel">Travel</Link>
                </li>
            </ul>
        </div>
        <div className="topCenterLogo">
            <img className="topListLogo" src="/img/logo.png" alt="" />
        </div>
        <div className="topRight">
                <div className="topIcons">
                  <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                  <i className="topAdminIcon fa-solid fa-gear" onClick={handleAdmin}></i>
                </div>
                {openAdmin &&
                    <Rightbar handleAdmin={handleAdmin} user={user} PF={PF} />
                }
        </div>
    </div>
    }
    </>
  )
}
