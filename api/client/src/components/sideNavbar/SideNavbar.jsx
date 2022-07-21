import "./sideNavbar.css";
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from "../../context/Context";

export default function SideNavbar() {

  const {theme} = useContext(Context);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar)
  };

  return (
    <>
      <div className="sideNavbar" data-theme={theme}>
          <Link className="link" to="#" onClick={showSidebar}><i className="bars fa-solid fa-bars"></i></Link>
      </div>
      <nav className={sidebar ? "navMenuActive" : "navMenu"}>
        <ul className="navbarMenuItems">
            <li className="navbarToggle" onClick={showSidebar}>
              <Link className="link" to="#">
                <i className="fa-solid fa-xmark" style={{fontSize:"20px", cursor:"pointer"}}></i>
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
                  <i className="fa-solid fa-user-group"></i>
                  <span className="text">Team</span>
                </div>
              </Link>
            </li>
            <li className="pageSection">
              <Link className="link" to="/travel">
                <div className="page">
                  <i className="fa-solid fa-plane"></i>
                  <span className="text">Travel</span>
                </div>
              </Link>
            </li>
        </ul>
      </nav>
    </>
  )
}
