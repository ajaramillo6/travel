import "./write.css";
import { useContext, useState } from "react";
import {axiosInstance} from "../../config";
import { Context } from "../../context/Context";
import PostSectionWrite from "../../components/postSectionWrite/PostSectionWrite";
import { countryListAllIsoData } from "../../countryListAllIsoData";
import { usaStatesListAllData } from "../../usaStatesListAllData";

export default function Write() {

  const cloud = "https://api.cloudinary.com/v1_1/alvjo/image/upload";
  
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loc, setLoc] = useState("");
  const [state, setState] = useState("");

  const [postSection, setPostSection] = useState([]);
  const [sectionHeader, setSectionHeader] = useState("");
  const [sectionImg, setSectionImg] = useState(null);
  const [sectionImgDesc, setSectionImgDesc] = useState("");
  const [sectionText, setSectionText] = useState("");
  const [sectionListTitle, setSectionListTitle] = useState("");
  const [sectionListItems, setSectionListItems] = useState("");
  const [addedNotification, setAddedNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSectionInstructions, setShowSectionInstructions] = useState(false);

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
    newSectionWords,
    sectionListTitle,
    listWords,
  }
  if(sectionImg){
    const data = new FormData();
    const filename = Date.now() + sectionImg.name;
    data.append("name", filename)
    data.append("file", sectionImg);
    data.append("upload_preset", "uploads");
    try{
      const uploadRes = await axiosInstance.post(cloud, data);
      const {url} = uploadRes.data;
      newSection.sectionImg = url;
    }catch(err){
      console.log(err);
    }
  }
  if(newSection.sectionHeader === "" && 
    newSection.newSectionWords === "" && 
    newSection.sectionImg === null &&
    newSection.sectionImgDesc === "" &&
    newSection.sectionListTitle === "" &&
    newSection.listWords.length === 1){
    handleErrorNotification();
  } else {
    postSectionHistory(newSection);
    clearFields();
    handleAddedNotification();
  }
}

  const clearFields = () => {
    setSectionHeader("");
    setSectionImg(null);
    setSectionImgDesc("");
    setSectionText("");
    setSectionListTitle("");
    setSectionListItems("");
  }

  const handleAddedNotification = () => {
    setAddedNotification(!addedNotification);
    setTimeout(()=>{setAddedNotification(false)}, 3000);
  }

  const handleErrorNotification = () => {
    setErrorNotification(!errorNotification);
    setTimeout(()=>{setErrorNotification(false)}, 3000);
  }

  const handleRemoveSection = (id) => {
    const filteredSection = postSection.filter((section) => section.sectionId !== id);
    setPostSection(filteredSection);
  }

  //******************/

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(postSection !== []){
      const newPost = {
        username: user.username,
        profilePic: user.profilePic,
        bio: user.bio,
        pinterest: user.pinterest,
        instagram: user.instagram,
        facebook: user.facebook,
        title,
        newDescWords,
        loc,
        state,
        postSection,
      }
      if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename)
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try{
          const uploadRes = await axiosInstance.post(cloud, data);
          const {url} = uploadRes.data;
          newPost.photo = url;
        }catch(err){
          console.log(err);
        }
      }
      try{
        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/"+res.data._id);
      }catch(err){
        console.log(err);
      }
    }
  }

  const handleCloseImg = () => {
    setSectionImg(null);
  }

  const handleInstructions = () => {
    setShowInstructions(!showInstructions);
  }

  const handleSectionInstructions = () => {
    setShowSectionInstructions(!showSectionInstructions);
  }

  //******************/DESC TEXT AREA

  //Links in Desc text area
  const findDescUrls = [];
  const findDescIndex = [];
  const newDescWords = [];
  const createDescLinks = [];
  const descLinks = [];
  const newDescText=[];

  const descWords = desc.split(" ");

  for(let i = 0; i < descWords.length; i++){
    if(descWords[i][0] === "[" && descWords[i].slice(-1) !== "."){
      findDescUrls.push(descWords[i]);
      findDescIndex.push(i);
    } else if(descWords[i][0] === "[" && descWords[i].slice(-1) === "."){
      findDescUrls.push(descWords[i].slice(0,-1));
      findDescIndex.push(i);
    }
  }

  for(let j = 0; j < findDescUrls.length; j++){
    if(findDescUrls[j].includes("@")){
      createDescLinks.push(
        `[${findDescUrls[j].split("@")[1].slice(0,-1)},${(findDescUrls[j].split("@")[0].substring(1)).split("-").join(" ")}]`);
    }
  }

  for(let x = 0; x < createDescLinks.length; x++){
    descLinks.push([findDescIndex[x], createDescLinks[x]]);
  }

  //Insert link objects as replacement for square bracket content
  for (let w = 0; w < descLinks.length; w++){
    newDescText.push(descWords[descLinks[w][0]] = descLinks[w][1]);
  }

  //Create space between words, except if they're objects.
  for(let x = 0; x < descWords.length; x++){
      newDescWords.push(descWords[x] + " ");
  }

  //******************/SECTION TEXT AREA

  //Links in Section text area
  const findSectionUrls = [];
  const findSectionIndex = [];
  const newSectionWords = [];
  const createSectionLinks = [];
  const sectionLinks = [];
  const newSectionText=[];

  const sectionWords = sectionText.split(" ");

  for(let i = 0; i < sectionWords.length; i++){
    if(sectionWords[i][0] === "[" && sectionWords[i].slice(-1) !== "."){
      findSectionUrls.push(sectionWords[i]);
      findSectionIndex.push(i);
    } else if(sectionWords[i][0] === "[" && sectionWords[i].slice(-1) === "."){
      findSectionUrls.push(sectionWords[i].slice(0,-1));
      findSectionIndex.push(i);
    }
  }

  for(let j = 0; j < findSectionUrls.length; j++){
    if(findSectionUrls[j].includes("@")){
      createSectionLinks.push(
        `[${findSectionUrls[j].split("@")[1].slice(0,-1)},${(findSectionUrls[j].split("@")[0].substring(1)).split("-").join(" ")}]`);
    }
  }

  for(let x = 0; x < createSectionLinks.length; x++){
    sectionLinks.push([findSectionIndex[x], createSectionLinks[x]]);
  }

  //Insert link objects as replacement for square bracket content
  for (let w = 0; w < sectionLinks.length; w++){
    newSectionText.push(sectionWords[sectionLinks[w][0]] = sectionLinks[w][1]);
  }

  //Create space between words, except if they're objects.
  for(let x = 0; x < sectionWords.length; x++){
      newSectionWords.push(sectionWords[x] + " ");
  }

  //******************/
  const listWords = sectionListItems.split(", ");
  
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
              <div className="sectionSpanContainer">
                <i className="sectionQuestion fa-solid fa-circle-question" onClick={handleSectionInstructions}></i>
                <span className="sectionSpan">{"Add New Section (all below are optional)"}</span>
              </div>
              {showSectionInstructions &&
                <div className="sectionInstructions">
                  <div>What is this?</div>
                  <div>By creating sections you can add multiple images. Each section only contains 1 image.</div>
                </div>
                }
              <div className="sectionTitleWrapper">
                <label htmlFor="fileInput2">
                  <i className="writeIcon fa-solid fa-image"></i>
                </label>
                {sectionHeader ? 
                  <input 
                    className="sectionInputHeader"
                    type="text" 
                    placeholder="Header Title" 
                    onChange={e=>setSectionHeader(e.target.value)} 
                  />:
                  <input 
                    className="sectionInputHeader"
                    type="text" 
                    value={sectionHeader}
                    placeholder="Section Title" 
                    onChange={e=>setSectionHeader(e.target.value)} 
                  /> 
                }
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
                  <i className="sectionImgClose fa-solid fa-rectangle-xmark fa-lg" onClick={handleCloseImg}></i>
                  <img src={URL.createObjectURL(sectionImg)} alt="" className="writeSectionImg" />
                  {sectionImgDesc ?
                    <input 
                      className="sectionInput"
                      type="text" 
                      placeholder="Image description" 
                      onChange={e=>setSectionImgDesc(e.target.value)} 
                    />:
                    <input 
                      className="sectionInput"
                      type="text" 
                      value={sectionImgDesc}
                      placeholder="Image description" 
                      onChange={e=>setSectionImgDesc(e.target.value)} 
                    />
                  }
                </>
                }
              </div>
              {sectionText ?
                <textarea 
                  id="textarea"
                  className="sectionInput"
                  type="text" 
                  placeholder="Section Text" 
                  onChange={e=>setSectionText(e.target.value)}> 
                </textarea>:
                <textarea 
                  id="textarea"
                  className="sectionInput"
                  type="text" 
                  value={sectionText}
                  placeholder="Section Text" 
                  onChange={e=>setSectionText(e.target.value)}> 
                </textarea>
              }
              {sectionListTitle ?
                <input 
                  className="sectionInputListTitle"
                  type="text" 
                  placeholder="List Title" 
                  onChange={e=>setSectionListTitle(e.target.value)} 
                />:
                <input 
                  className="sectionInputListTitle"
                  type="text" 
                  value={sectionListTitle}
                  placeholder="List Title" 
                  onChange={e=>setSectionListTitle(e.target.value)} 
                />
              }
              {sectionListItems ?
                <input 
                  className="sectionInputListItems"
                  type="text" 
                  placeholder="List items (split list by commas)" 
                  onChange={e=>setSectionListItems(e.target.value)} 
                />:
                <input 
                  className="sectionInputListItems"
                  type="text" 
                  value={sectionListItems}
                  placeholder="List items (split list by commas)" 
                  onChange={e=>setSectionListItems(e.target.value)} 
                />
              }
              {(createDescLinks || createSectionLinks) &&
              <div className="sectionUrls">
                <i className="sectionUrlsQuestion fa-solid fa-circle-question" onClick={handleInstructions}></i>
                <span className="sectionUrlTitle">Links Created</span>
                {showInstructions &&
                <div className="sectionInstructions">
                  <div>How to create links:</div>
                  <div>1. Use square brackets ( [...] ) to enclose a new link.</div>
                  <div>2. Use dashes ( - ) when naming the link if more than one word.</div>
                  <div>3. Then use @ symbol to assign url address.</div>
                </div>
                }
                {createDescLinks.map((url, i)=>(
                <div className="urlContainer" key={i}>
                  <a className="urlLink" href={url.split(",")[0].substring(1)}>{url.split(",")[1].slice(0,-1)}</a>
                </div>
                ))}
                {createSectionLinks.map((url, i)=>(
                <div className="urlContainer" key={i}>
                  <a className="urlLink" href={url.split(",")[0].substring(1)}>{url.split(",")[1].slice(0,-1)}</a>
                </div>
                ))}
              </div>
              }
              {!addedNotification &&
              <button 
                className="writeSubmitSection" 
                onClick={handleSubmitSection}>
                  Add
              </button>
              }
              {addedNotification &&
                <div className="sectionAddedNotification">
                  <i className="successIcon fa-solid fa-circle-check"></i>
                  Added sucessfully.
                </div>
              }
              {errorNotification &&
                <div className="sectionErrorNotification">
                  <i className="errorIcon fa-solid fa-circle-exclamation"></i>
                  Section is empty. Try again.
                </div>
              }
              <PostSectionWrite postSection={postSection} handleRemoveSection={handleRemoveSection} />
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}
