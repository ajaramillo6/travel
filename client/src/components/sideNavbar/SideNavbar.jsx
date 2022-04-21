import "./sideNavbar.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SideNavbar() {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="sideNavbar">
          <Link className="link" to="#" onClick={showSidebar}><i className="bars fa-solid fa-bars"></i></Link>
      </div>
      <nav className={sidebar ? "navMenuActive" : "navMenu"}>
        <ul className="navbarMenuItems">
            <li className="navbarToggle" onClick={showSidebar}>
              <Link className="link" to="#">
                <i className="fa-solid fa-xmark" style={{fontSize:"20px", color:"black", cursor:"pointer"}}></i>
              </Link>
            </li>
            <li className="pageSection">
              <Link className="link" to="/">
                <div className="page">
                  <i className="fa-solid fa-house"></i>
                  <span className="text">Home</span>
                </div>
              </Link>
            </li>
            <li className="pageSection">
              <Link className="link" to="/about">
                <div className="page">
                  <i className="fa-solid fa-circle-info"></i>
                  <span className="text">About</span>
                </div>
              </Link>
            </li>
            <li className="pageSection">
              <Link className="link" to="/write">
                <div className="page">
                  <i className="fa-solid fa-plane"></i>
                  <span className="text">Travel</span>
                </div>
              </Link>
            </li>
            <li className="pageSection">
              <Link className="link" to="#">
                <div className="page">
                  <i className="fa-solid fa-envelope"></i>
                  <span className="text">Contact Me</span>
                </div>
              </Link>
            </li>
        </ul>
      </nav>
    </>
  )
}
