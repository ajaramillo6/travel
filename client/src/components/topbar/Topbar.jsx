import "./topbar.css";
import { Link } from 'react-router-dom';
import SideNavbar from "../sideNavbar/SideNavbar";

export default function Topbar() {

    const user = false;

  return (
    <div className="top">
        <div className="topLeft">
            <SideNavbar />
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li><img className="topListLogo" src="/img/logo.png" alt="" /></li>
                <li>
                    <Link className="topListItem" to="/">HOME</Link>
                </li>
                <li>
                    <Link className="topListItem" to="/about">ABOUT</Link>
                </li>
                <li>
                    <Link className="topListItem" to="/write">TRAVEL</Link>
                </li>
                <li className="topListItem">CONTACT ME</li>
            </ul>
        </div>
        <div className="topCenterLogo">
            <img className="topListLogo" src="/img/logo.png" alt="" />
        </div>
        <div className="topRight">
            {user ? (
                <>
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <img className="topImg" src="/img/profile.jpg" alt="" />
                </>
            ): (
                <ul className="topList">
                    <li>
                        <Link className="topListLogin" to="/login">LOGIN</Link>
                    </li>
                    <li>
                        <Link className="topListRegister" to="/register">REGISTER</Link>
                    </li>
                </ul>
            )}
        </div>
    </div>
  )
}
