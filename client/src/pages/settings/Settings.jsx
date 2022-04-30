import "./settings.css";
import { useContext, useState, useEffect } from "react";
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
  const [updateMode, setUpdateMode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(()=> {
    const getUser = async() => {
      const res = await axios.get("/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setBio(res.data.bio);
      setPinterest(res.data.pinterest);
      setInstagram(res.data.instagram);
      setFacebook(res.data.facebook);
    }
    getUser();
  },[user._id]);

  const handleDelete = async() => {
    try{
      await axios.delete(`/users/${user._id}`, {
        data: {
          username: user.username, 
        },
      });
      window.location.replace("/")
    }catch(err){
      console.log(err);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({ type:'UPDATE_START' });
    if(password !== passwordCheck){
      setWrongPassword(true)
    } else {
      setWrongPassword(false)
    const updatedUser = {
      userId: user._id,
      profilePic: user.profilePic,
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
        setUpdateMode(false);
      }catch(err){
          dispatch({ type:'UPDATE_FAILURE' });
          console.log(err);
      }
    }
  }

  return (
    <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your account</span>
            <div className="settingsUpdateMode">
              {!updateMode ?
                <i className="settingsEdit fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i> :
                <i className="settingsEditCancel fa-solid fa-circle-xmark fa-xl" onClick={()=>setUpdateMode(false)}></i>
              }
              <i className="settingsDelete fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            {updateMode ? 
            (
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
            ) : (
              <div className="settingsPPSavedContainer">
                {user.profilePic ?
                  <img src={PF + user.profilePic} alt="" className="settingsPPSaved" /> :
                  <img src={PF + "blank_avatar.jpg"} alt="" className="settingsPPSaved" />
                }
              </div>
            )
            }
            {updateMode && 
            <>
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                placeholder="Enter a password"
                onChange={(e)=>setPassword(e.target.value)} 
              />
              <label>
                Confirm Password
              </label>
              <input 
                type="password" 
                value={passwordCheck}
                placeholder="Re-enter password"
                onChange={(e)=>setPasswordCheck(e.target.value)} 
              />
            </>
            }
            <label>Username</label>
            {updateMode ? 
            (
              <input 
                type="text" 
                value={username}
                placeholder={user.username} 
                onChange={(e)=>setUsername(e.target.value)}
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.username}
              </div>
            )
            }
            <label>Email</label>
            {updateMode ? 
            (
              <input 
                type="email" 
                value={email}
                placeholder={user.email} 
                onChange={(e)=>setEmail(e.target.value)}
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.email}
              </div>
            )}
            <label>Bio</label>
            {updateMode ? 
            (
              <textarea 
                type="text" 
                className="settingsBioText"
                value={bio}
                placeholder={user.bio} 
                onChange={(e)=>setBio(e.target.value)} 
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.bio}
              </div>
            )}
            <label>Pinterest</label>
            {updateMode ? 
            (
              <input 
                type="text" 
                value={pinterest}
                placeholder={user.pinterest} 
                onChange={(e)=>setPinterest(e.target.value)} 
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.pinterest}
              </div>
            )}
            <label>Instagram</label>
            {updateMode ? (
              <input 
                type="text" 
                value={instagram}
                placeholder={user.instagram} 
                onChange={(e)=>setInstagram(e.target.value)} 
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.instagram}
              </div>
            )}
            <label>Facebook</label>
            {updateMode ? (
              <input 
                type="text" 
                value={facebook}
                placeholder={user.facebook} 
                onChange={(e)=>setFacebook(e.target.value)} 
              />
            ) : (
              <div className="settingsInfoSaved">
                {user.facebook}
              </div>
            )}
            {(updateMode && password !== "") &&
              <div className="settingsFinalStep">
                <button 
                  className="settingsSubmit" 
                  type="submit"
                  >
                  Update
                </button>
                {wrongPassword &&
                  <div className="notificationPassword">
                    <i className="errorIcon fa-solid fa-circle-exclamation"></i>
                    Passwords didn't match. Try again.
                  </div>
                }
              </div>
            }
            {(updateMode && password === "") &&
                <div className="notificationError">
                  <i className="errorIcon fa-solid fa-circle-exclamation"></i>
                  Enter a password
                </div>
            }
            {success &&
              <div className="notification">
                <i className="successIcon fa-solid fa-circle-check"></i>
                Profile has updated successfully!
              </div>
            }
          </form>
        </div>
    </div>
  )
}
