import "./about.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default function About() {

    const PF = "http://localhost:5000/images/"

    const[users, setUsers] = useState([]);

  useEffect(()=> {
    const fetchUsers = async() => {
      const res = await axios.get("/users");
      setUsers(res.data);
      console.log(res)
    }
    fetchUsers();
  },[])

  return (
<>
    <div className="about">
        {users.map((a, i)=>(
            <Link className="link" to={`/travel/?user=${a.username}`}>
                <div className="aboutAuthorContainer" key={i}>
                    <img className="aboutAuthorPP" src={PF + a.profilePic} alt="" />
                    <span className="aboutAuthorUsername">{a.username}</span>
                    <span className="aboutAuthorBio">{a.bio}</span>
                    <div className="aboutSocial">
                        <a className="link" href={a.pinterest}>
                            <i className="aboutSocialIcon fa-brands fa-pinterest-square"></i>
                        </a>
                        <a className="link" href={a.instagram}>
                            <i className="aboutSocialIcon fa-brands fa-instagram-square"></i>
                        </a>
                        <a className="link" href={a.facebook}>
                            <i className="aboutSocialIcon fa-brands fa-facebook-square"></i>
                        </a>
                    </div>
               </div>
            </Link>
        ))}
    </div>
</>
  )
}
