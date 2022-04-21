import "./rightbar.css";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Link } from 'react-router-dom';

export default function Rightbar({handleAdmin, PF, user}) {

    const { dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        handleAdmin();
    }

  return (
    <>
    <nav className={handleAdmin ? "rightbarActive" : "rightbar"}>
            {user ? (
                <ul className="rightbarMenuItems">
                    <li className="rightbarToggle" onClick={handleAdmin}>
                        <Link className="link" to="#">
                            <i className="fa-solid fa-xmark" style={{fontSize:"20px", color:"black", cursor:"pointer"}}></i>
                        </Link>
                    </li>
                    <li className="rightbarImgSection">
                        <Link 
                            className="link" 
                            to="/settings" 
                            onClick={handleAdmin}>
                            <img className="rightbarImg" src="/img/profile.jpg" alt="" />
                        </Link> 
                    </li>
                    <li className="rightbarSection">
                        <Link 
                            className="link" 
                            to="/write" 
                            onClick={handleAdmin}>
                            <div className="rightSection">
                                <i className="fa-solid fa-pen"></i>
                                <span className="rightText">Write</span>
                            </div>
                        </Link> 
                    </li>
                    <li className="rightbarSection">
                        <Link
                            className="link" 
                            to="#" 
                            onClick={handleAdmin}>
                            <div className="rightSection" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span className="rightText">Logout</span>
                            </div>
                        </Link>
                    </li>
                </ul> 
            ):(
                <ul className="rightbarMenuItems">
                    <li className="rightbarToggle" onClick={handleAdmin}>
                        <Link className="link" to="#">
                            <i className="fa-solid fa-xmark" style={{fontSize:"20px", color:"black", cursor:"pointer"}}></i>
                        </Link>
                    </li>
                    <li className="rightbarSection">
                        <Link 
                            className="link" 
                            to="/login" 
                            onClick={handleAdmin}>
                            <div className="rightSection">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="rightText">Login</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            )}
    </nav>
    </>
  )
}
