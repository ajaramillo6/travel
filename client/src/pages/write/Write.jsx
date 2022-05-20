import "./write.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import PostSectionWrite from "../../components/postSectionWrite/PostSectionWrite";
import { countryListAllIsoData } from "../../countryListAllIsoData";
import { usaStatesListAllData } from "../../usaStatesListAllData";

export default function Write() {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loc, setLoc] = useState("");
  const [state, setState] = useState("");

  const [postSection, setPostSection] = useState([]);
  const[sectionHeader, setSectionHeader] = useState("");
  const [sectionImg, setSectionImg] = useState(null);
  const[sectionImgDesc, setSectionImgDesc] = useState("");
  const[sectionText, setSectionText] = useState("");
  const[sectionListTitle, setSectionListTitle] = useState("");
  const[sectionListItems, setSectionListItems] = useState("");


function postSectionHistory(text) {
  setPostSection((history) => [...history, text]);
}

  const handleSubmitSection = async(e) => {
    e.preventDefault();
    const newSection = {
      sectionId: Date.now(),
      sectionHeader,
      sectionImg,
      sectionImgDesc,
      sectionText,
      sectionListTitle,
      sectionListItems: sectionListItems.split(/[, ]+/),
    }
    if(sectionImg){
      const data = new FormData();
      const filename = Date.now() + sectionImg.name;
      data.append("name", filename)
      data.append("file", sectionImg);
      newSection.sectionImg = filename;
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err);
      }
    }
    postSectionHistory(newSection);
  }

  const handleRemoveSection = (id) => {
    const filteredSection = postSection.filter((section) => section.sectionId !== id);
    setPostSection(filteredSection);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(postSection !== []){
      const newPost = {
        username: user.username,
        profilePic: PF + user.profilePic,
        bio: user.bio,
        pinterest: user.pinterest,
        instagram: user.instagram,
        facebook: user.facebook,
        title,
        desc,
        loc,
        state,
        postSection,
      }
      if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename)
        data.append("file", file);
        newPost.photo = filename;
        try{
          await axios.post("/upload", data);
        }catch(err){
          console.log(err);
        }
      }
      try{
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/"+res.data._id);
      }catch(err){
        console.log(err);
      }
    }
  }

  const handleCloseImg = () => {
    setSectionImg(null);
  }

  return (
    <div className="write">
      {file &&
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      }
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-image"></i>
                </label>
                <input 
                  style={{display:"none"}} 
                  id = "fileInput"
                  type="file"
                  name="fileInput"
                  accept=".jpeg, .jpg, .png" 
                  onChange={e=>setFile(e.target.files[0])} 
                />
                <input 
                  type="text" 
                  placeholder="Title" 
                  className="writeInput" 
                  autoFocus={true} 
                  onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
              <select 
                className="writeLocationInput" 
                onChange={(e)=>setLoc(e.target.value)}>
                {countryListAllIsoData.map(country=>(
                  <option 
                    key={country.number} 
                    >
                    {country.name}
                  </option>
                ))}
              </select>
              {loc === 'United States' &&
                <select 
                  className="writeLocationInput" 
                  onChange={(e)=>setState(e.target.value)}>
                  {usaStatesListAllData.map(state=>(
                    <option 
                      key={state.number} 
                      >
                      {state.name}
                    </option>
                  ))}
                </select>
              }
            </div>
            <div className="writeFormGroup">
              <textarea 
                id="textarea"
                placeholder="Tell your story intro..." 
                type="text" 
                className="writeInput writeText"
                onChange={e=>setDesc(e.target.value)}>
              </textarea>
            </div>
            <div className="sectionContainer">
              <span className="sectionSpan">Add New Section</span>
              <div className="sectionTitleWrapper">
                <label htmlFor="fileInput2">
                  <i className="writeIcon fa-solid fa-image"></i>
                </label>
                <input 
                  className="sectionInputHeader"
                  type="text" 
                  placeholder="Header Title" 
                  onChange={e=>setSectionHeader(e.target.value)} 
                />
                <input 
                  style={{display:"none"}} 
                  id = "fileInput2"
                  type="file"
                  name="fileInput2"
                  accept=".jpeg, .jpg, .png" 
                  onChange={e=>setSectionImg(e.target.files[0])} 
                />
              </div>
              <div className="sectionImgWrapper">
                {sectionImg &&
                <>
                  <i class="sectionImgClose fa-solid fa-rectangle-xmark fa-lg" onClick={handleCloseImg}></i>
                  <img src={URL.createObjectURL(sectionImg)} alt="" className="writeSectionImg" />
                  <input 
                    className="sectionInput"
                    type="text" 
                    placeholder="Image description" 
                    onChange={e=>setSectionImgDesc(e.target.value)} 
                  />
                </>
                }
              </div>
              <textarea 
                id="textarea"
                className="sectionInput"
                type="text" 
                placeholder="Section Text" 
                onChange={e=>setSectionText(e.target.value)}> 
              </textarea>
              <input 
                className="sectionInputListTitle"
                type="text" 
                placeholder="List Title" 
                onChange={e=>setSectionListTitle(e.target.value)} 
              />
              <input 
                className="sectionInputListItems"
                type="text" 
                placeholder="List items (split list by commas)" 
                onChange={e=>setSectionListItems(e.target.value)} 
              />
              <button 
                className="writeSubmitSection" 
                onClick={handleSubmitSection}>
                  Add
              </button>
              <PostSectionWrite postSection={postSection} handleRemoveSection={handleRemoveSection} />
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}
