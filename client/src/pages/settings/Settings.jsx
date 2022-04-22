import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {

  const {user} = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file);
      updatedUser.profilePic = filename;

      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err);
      }
    }
    try{
      await axios.put("/users/"+user._id, updatedUser);
      setSuccess(true);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your account</span>
            <i className="settingsDelete fa-solid fa-trash"></i>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img src={file ? URL.createObjectURL(file) : user.profilePic} alt="" />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-solid fa-circle-user"></i>
              </label>
              <input 
                type="file" 
                id="fileInput" 
                style={{display:"none"}} 
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input 
              type="text" 
              placeholder={user.username} 
              onChange={(e)=>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
              type="email" 
              placeholder={user.email} 
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              onChange={(e)=>setPassword(e.target.value)} 
            />
            <button className="settingsSubmit" type="submit">Update</button>
            {success && 
              <span style={{
                  color:'aquamarine', 
                  textAlign:"center", 
                  marginTop:'20px', 
                  fontSize: "12px"}}>
                Profile has updated successfully.
              </span>}
          </form>
        </div>
        <Sidebar />
    </div>
  )
}
