import "./homeAbout.css"
import { useState, useEffect } from "react";
import {axiosInstance} from "../../config";
import { Link } from "react-router-dom";

export default function HomeAbout({ theme }) {

    const[users, setUsers] = useState([]);
    const[buttonHover, setButtonHover] = useState(false);

    useEffect(()=> {
        const fetchUsers = async() => {
          const res = await axiosInstance.get("/users");
          setUsers(res.data.sort((a,b)=>
            a.username.localeCompare(b.username)
          ));
        }
        fetchUsers();
      },[])

      const handleButton = () => {
        setButtonHover(true);
      }
    
      const handleButtonLeave = () => {
        setButtonHover(false);
      }

  return (
    <div className="homeAbout" data-theme={theme}>
        <div className="homeAboutLeft">
            {users.map((a, i)=>(
            <>
            <div className="homeAuthorContainer">
                <Link className="link" to={`/travel/?user=${a.username}`}>
                    <div className="homeAuthorWrapper" key={i}>
                        <div className="homeAuthorPPWrapper">
                            <img className="homeAuthorPP" src={a.profilePic} alt="" />
                        </div>
                    </div>
                </Link>
            </div>
            </>
            ))}
        </div>
        <div className="homeAboutRight">
            <div className="homeAboutTextContainer">
                <span className="homeAboutTitle">Meet the Authors</span>
                <div className="homeAboutText">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, distinctio saepe labore magni tenetur minus quaerat dolor quo possimus, molestiae adipisci dolores eligendi sunt in tempora ullam similique ea obcaecati?
                </div>
                <div>
                    <Link className="link" to="/about">
                        <div className="homeAboutReadMore" onMouseOver={handleButton} onMouseLeave={handleButtonLeave}> 
                            Learn More 
                            <i className={buttonHover ? "homeAboutBook fa-solid fa-book":"homeAboutBookHide fa-solid fa-book"}></i>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
