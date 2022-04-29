import "./sidebar.css";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation} from 'react-router-dom';
import { Context } from "../../context/Context";

export default function Sidebar({author, profile, pinterest, instagram, facebook}) {
  
  const PF = "http://localhost:5000/images/";

  const {user} = useContext(Context);

    //FIND LOCATIONS BY USER

    const[posts, setPosts] = useState([]);

    const {search} = useLocation();
  
    useEffect(()=> {
      const fetchPosts = async() => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      }
      fetchPosts();
    },[search])
  
    //Find unique locations
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  
    //PULL USER AND LOCS
    let locations = [];
    for (let i=0; i < posts.length; i++){
      locations.push([posts[i].username,posts[i].loc]);
    }

    let userLocs = [];
    for (let i=0; i < locations.length; i++){
      if(locations[i][0] == author){
        userLocs.push(locations[i])
      }
    }

    let userLocList = [];
    for (let i=0; i < userLocs.length; i++){
        userLocList.push(userLocs[i][1])
    }
    const locs = userLocList.filter(onlyUnique).sort();

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">AUTHOR</span>
        <Link className="link" to={`/travel/?user=${author}`}>
          <div className="sidebarProfileWrapper">
            <img className="sidebarProfilePic" src={profile} alt="" />
          </div>
        </Link>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">COUNTRIES</span>
        <div className="sidebarList">
          {locs.map((loc, i)=>(
                  <div>
                    <div key={i}>
                      <Link className="link" to={`/travel/?cat=${loc}`}>
                        <div className="sidebarListItemWrapper">
                          <div className="sidebarListItem">{loc}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
            ))}
          </div>
      </div>
      <div className="sidebarItem">
        <span className={(pinterest && instagram && facebook) != "" ? "sidebarTitle":"noLink"}>
          FOLLOW
        </span>
        <div className="sidebarSocial">
          <a className={pinterest != "" ? "link":"noLink"} href={pinterest}>
            <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          </a>
          <a className={instagram != "" ? "link":"noLink"} href={instagram}>
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          </a>
          <a className={facebook != "" ? "link":"noLink"} href={facebook}>
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
