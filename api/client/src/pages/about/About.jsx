import "./about.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom"

export default function About() {

    const[users, setUsers] = useState([]);
    const[readMore, setReadMore] = useState("");
    const[openReadMore, setOpenReadMore] = useState(false);

  useEffect(()=> {
    const fetchUsers = async() => {
      const res = await axiosInstance.get("/users");
      setUsers(res.data.sort((a,b)=>
        a.username.localeCompare(b.username)
      ));
    }
    fetchUsers();
  },[])

  const handleReadMore = (bio,profilePic,username,pin,inst,fac) => {
        setReadMore([bio,profilePic,username,pin,inst,fac]);
        setOpenReadMore(!openReadMore);
  }

  return (
<>
    <div className="about">
        {users.map((a, i)=>(
        <>
            <div className="aboutAuthorContainer">
                <Link className="link" to={`/travel/?user=${a.username}`}>
                    <div className="aboutAuthorWrapper" key={i}>
                        <div className="aboutAuthorPPWrapper">
                            <img className="aboutAuthorPP" src={a.profilePic} alt="" />
                        </div>
                        <span className="aboutAuthorUsername">{a.username}</span>
                        <span className="aboutAuthorBio">{a.bio}</span>
                    </div>
                </Link>
                <div className="aboutReadMore" onClick={()=>handleReadMore(
                    a.bio,
                    a.profilePic,
                    a.username,
                    a.pinterest,
                    a.instagram,
                    a.facebook,
                    )}>
                    READ MORE
                    <i className="aboutReadMoreIcon fa-solid fa-angle-right"></i>
                </div>
                <div className="aboutSocial">
                    <a className={a.pinterest !== "" ? "link":"noLink"} href={a.pinterest}>
                        <i className="aboutSocialIcon fa-brands fa-pinterest-square"></i>
                    </a>
                    <a className={a.instagram !== "" ? "link":"noLink"} href={a.instagram}>
                        <i className="aboutSocialIcon fa-brands fa-instagram-square"></i>
                    </a>
                    <a className={a.facebook !== "" ? "link":"noLink"} href={a.facebook}>
                        <i className="aboutSocialIcon fa-brands fa-facebook-square"></i>
                    </a>
                </div>
            </div>
        </>
        ))}
        {openReadMore &&
        <div className="aboutBioContainer">
            <div className="aboutBioWrapper">
                <i className="aboutBioClose fa-solid fa-circle-xmark fa-xl" onClick={()=>setOpenReadMore(false)}></i>
                <div className="aboutBioText">
                    <div className="aboutBioPPContainer">
                        <img className="aboutBioPP" src={readMore[1]} alt="" />
                        <div className="aboutBioUsernameContainer">
                            <span className="aboutBioUsername">{readMore[2]}</span>
                            <div className="aboutBioSocialContainer">
                                <a className={readMore[3] !== "" ? "link":"noLink"} href={readMore[3]}>
                                    <i className="aboutSocialIcon fa-brands fa-pinterest-square"></i>
                                </a>
                                <a className={readMore[4] !== "" ? "link":"noLink"} href={readMore[4]}>
                                    <i className="aboutSocialIcon fa-brands fa-instagram-square"></i>
                                </a>
                                <a className={readMore[5] !== "" ? "link":"noLink"} href={readMore[5]}>
                                    <i className="aboutSocialIcon fa-brands fa-facebook-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="aboutBio">{readMore[0]}</div>
                </div>
            </div>
        </div>
        }
    </div>
</>
  )
}
