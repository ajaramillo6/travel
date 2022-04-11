import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="/img/profile.jpg" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Incidunt tenetur voluptatum accusantium voluptas laudantium 
          dolorum esse modi cum facere!</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">MY OTHER BLOGS</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Books</li>
          <li className="sidebarListItem">Style</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
        </div>
      </div>
    </div>
  )
}
