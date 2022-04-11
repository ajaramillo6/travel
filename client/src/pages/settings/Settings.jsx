import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Settings() {
  return (
    <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your account</span>
            <i className="settingsDelete fa-solid fa-trash"></i>
          </div>
          <form className="settingsForm">
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img src="/img/profile.jpg" alt="" />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-solid fa-circle-user"></i>
              </label>
              <input type="file" id="fileInput" style={{display:"none"}} />
            </div>
            <label>Username</label>
            <input type="text" placeholder="Megan" />
            <label>Email</label>
            <input type="email" placeholder="megan@gmail.com" />
            <label>Password</label>
            <input type="password" />
            <button className="settingsSubmit">Update</button>
          </form>
        </div>
        <Sidebar />
    </div>
  )
}
