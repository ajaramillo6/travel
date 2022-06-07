import "./sidebar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation} from 'react-router-dom';
import { format } from 'timeago.js';

export default function Sidebar({author, compareProfile, post}) {

    //FIND LOCATIONS BY USER

    const[posts, setPosts] = useState([]);

    const {search} = useLocation();
  
    useEffect(()=> {
      const fetchPosts = async() => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data.sort((p1,p2)=> {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
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

  //OTHER POSTS BY AUTHOR
  const otherPosts = [];
  for (let i=0; i < posts.length; i++){
    if(posts[i].username === author && posts[i].title !== post.title){
      otherPosts.push(posts[i]);
    }
  }

  //RELATED POSTS BY ANY AUTHOR
  const relatedPosts = [];
  for (let i=0; i < posts.length; i++){
    if((posts[i].loc === post.loc || posts[i].state === post.state) && posts[i].title !== post.title){
      relatedPosts.push(posts[i]);
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebarItemProfile">
        <Link className="link" to={`/travel/?user=${author}`}>
          <div className="sidebarProfileWrapper">
            <img className="sidebarProfilePic" src={compareProfile} alt="" />
          </div>
        </Link>
          <div className="sidebarProfileInfoContainer">
            <div className="sidebarInfoSocial">
              <a className={post.pinterest !== "" ? "link":"noLink"} href={post.pinterest}>
                <i className="sidebarSocialIcon fa-brands fa-pinterest-square"></i>
              </a>
              <a className={post.instagram !== "" ? "link":"noLink"} href={post.instagram}>
                <i className="sidebarSocialIcon fa-brands fa-instagram-square"></i>
              </a>
              <a className={post.facebook !== "" ? "link":"noLink"} href={post.facebook}>
                <i className="sidebarSocialIcon fa-brands fa-facebook-square"></i>
              </a>
            </div>
          </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarList">
          <div className="sidebarTitle">Recent Posts</div>
          <hr />
          {otherPosts.slice(0,3).map((post, i)=>(
              <div>
                <div key={i}>
                <Link className="link" to={`/post/${post._id}`}>
                    <div className="sidebarPostsWrapper">
                      <div className="sidebarPostPicContainer">
                        <img className="sidebarPostPic" src={post.photo} alt="" />
                      </div>
                      <div className="sidebarPostContainer">
                        <div className="sidebarPostTitle">{post.title}</div>
                        <div className="sidebarPostDate">{format(post.createdAt)}</div>
                      </div>
                    </div>
                </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarList">
          <div className="sidebarTitle">Related Posts</div>
          <hr />
          {relatedPosts.slice(0,10).map((post, i)=>(
              <div>
                <div key={i}>
                <Link className="link" to={`/post/${post._id}`}>
                    <div className="sidebarPostsWrapper">
                      <div className="sidebarPostPicContainer">
                        <img className="sidebarPostPic" src={post.photo} alt="" />
                      </div>
                      <div className="sidebarPostContainer">
                        <div className="sidebarPostTitle">{post.title}</div>
                        <div className="sidebarPostDate">{format(post.createdAt)}</div>
                      </div>
                    </div>
                </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="sidebarItemLocations">
        <div className="sidebarItem">
          <div className="sidebarList">
            <div className="sidebarTitle">
              Countries visited
            </div>
            <hr />
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
          <div className="sidebarList">
            <div className="sidebarTitle">
              States visited
            </div>
            <hr />
            {usStates.map((state, i)=>(
                <div>
                  <div key={i}>
                    <Link className="link" to={`/travel/?state=${state}`}>
                      <div className="sidebarListItemWrapper">
                      {state !== "" &&
                          <div className="sidebarListItem">
                            {state}
                          </div>
                        }
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
