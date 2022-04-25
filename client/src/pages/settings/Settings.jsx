import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({ type:'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      bio,
      pinterest,
      instagram,
      facebook,
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
      const res = await axios.put("/users/"+user._id, updatedUser);
      dispatch({ type:'UPDATE_SUCCESS', payload: res.data });
      setSuccess(true);
    }catch(err){
      dispatch({ type:'UPDATE_FAILURE' });
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
              {user.profilePic ? 
                <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" /> 
              :
                <img src={file ? URL.createObjectURL(file) : PF + "blank_avatar.jpg"} alt="" />  
              }
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
            <label>Bio</label>
            <input 
              type="text" 
              placeholder={user.bio} 
              onChange={(e)=>setBio(e.target.value)} 
            />
            <label>Pinterest</label>
            <input 
              type="text" 
              placeholder={user.pinterest} 
              onChange={(e)=>setPinterest(e.target.value)} 
            />
            <label>Instagram</label>
            <input 
              type="text" 
              placeholder={user.instagram} 
              onChange={(e)=>setInstagram(e.target.value)} 
            />
            <label>Facebook</label>
            <input 
              type="text" 
              placeholder={user.facebook} 
              onChange={(e)=>setFacebook(e.target.value)} 
            />
            <div className="settingsFinalStep">
              <button className="settingsSubmit" type="submit">Update</button>
              {success && 
                <div className="notification">
                  <i className="successIcon fa-solid fa-circle-check"></i>
                  Profile has updated successfully!
                </div>
              }
            </div>
          </form>
        </div>
    </div>
  )
}
