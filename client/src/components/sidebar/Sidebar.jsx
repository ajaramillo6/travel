import "./sidebar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation} from 'react-router-dom';

export default function Sidebar({author, pinterest, instagram, facebook, compareProfile}) {

  const PF = "http://localhost:5000/images/";

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
    const locations = [];
    for (let i=0; i < posts.length; i++){
      locations.push([posts[i].username,posts[i].loc]);
    }

    const userLocs = [];
    for (let i=0; i < locations.length; i++){
      if(locations[i][0] === author){
        userLocs.push(locations[i])
      }
    }

    const userLocList = [];
    for (let i=0; i < userLocs.length; i++){
        userLocList.push(userLocs[i][1])
    }
    const locs = userLocList.filter(onlyUnique).sort();

  //PULL USER AND STATES
  const states = [];
  for (let i=0; i < posts.length; i++){
    states.push([posts[i].username,posts[i].state]);
  }

  const userStates = [];
  for (let i=0; i < states.length; i++){
    if(states[i][0] === author){
      userStates.push(states[i])
    }
  }

  const userStatesList = [];
  for (let i=0; i < userStates.length; i++){
      userStatesList.push(userStates[i][1])
  }
  const usStates = userStatesList.filter(onlyUnique).sort();

  

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">AUTHOR</span>
        <Link className="link" to={`/travel/?user=${author}`}>
          <div className="sidebarProfileWrapper">
            <img className="sidebarProfilePic" src={PF + compareProfile} alt="" />
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
        <span className="sidebarTitle">STATES</span>
        <div className="sidebarList">
          {usStates.map((state, i)=>(
              <div>
                <div key={i}>
                  <Link className="link" to={`/travel/?state=${state}`}>
                    <div className="sidebarListItemWrapper">
                      {state !== "" &&
                        <div className="sidebarListItem">{state}</div>
                      }
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="sidebarItem">
        <span className={(pinterest && instagram && facebook) !== "" ? "sidebarTitle":"noLink"}>
          FOLLOW
        </span>
        <div className="sidebarSocial">
          <a className={pinterest !== "" ? "link":"noLink"} href={pinterest}>
            <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          </a>
          <a className={instagram !== "" ? "link":"noLink"} href={instagram}>
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          </a>
          <a className={facebook !== "" ? "link":"noLink"} href={facebook}>
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
