import "./write.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { countryListAllIsoData } from "../../countryListAllIsoData";
import { usaStatesListAllData } from "../../usaStatesListAllData";

export default function Write() {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loc, setLoc] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
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

  //ADD IMAGES COMBINED WITH TEXT IN TEXTAREA

  // const postField = document.getElementById('textAreaContent');

  // const addImage = (alt, imgPath) => {
  //   let curPos = postField.selectionStart;
  //   let priorText = postField.value.slice(0, curPos);
  //   let textToInsert = `\r![${alt}](${imgPath})\r`;
  //   postField.value = priorText + textToInsert;
  //   setFile2(null);
  // }

  // const findTypes = (el, data) => {
  //   const findHeader = data.split("\n").filter(item => item.length);
  //   findHeader.forEach(item =>{
  //     if(item[0] === '#'){
  //       let hCount = 0;
  //       let i = 0;
  //       while(item[i] === '#'){
  //         hCount++;
  //         i++;
  //       }
  //       let tag = `h${hCount}`;
  //       if(item.length > 0){
  //         el.dangerouslySetInnerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
  //       }
  //     }
  //     else if(item[0] === "!" && item[1] === "["){
  //       let separator;
  //       for(let i = 0; i<=item.length; i++){
  //         if(item[i]==="]" & item[i+1] == "(" && item[item.length - 1] === ")"){
  //           separator = i;
  //         }
  //       }
  //       let alt = item.slice(2,separator);
  //       let src = item.slice(separator + 2, item.length - 1);
  //       el.dangerouslySetInnerHTML += `<img className="textAreaImg" src="${src}" alt="${alt}" />`;
  //     } else {
  //       el.dangerouslySetInnerHTML += `<p>${item}</p>`;
  //     } 
  //   });
  // }

  // if(postField){
  //   findTypes(postField, postField.value)
  // }

  // if(file2){
  //   addImage(file2.name,"/img/"+file2.name);
  // }

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
              <label htmlFor="fileInputImg">
                <span className="writeImageText"><i className="writeIconImg fa-solid fa-images"></i> Add image to content</span>
              </label>
              <input 
                style={{display:"none"}} 
                id = "fileInputImg"
                type="file"
                name="fileInputImg"
                accept=".jpeg, .jpg, .png"
                onChange={e=>setFile2(e.target.files[0])} 
              />
            </div>
            <div className="writeFormGroup">
              <textarea 
                placeholder="Tell your story..." 
                type="text" 
                className="writeInput writeText"
                id="textAreaContent"
                onChange={e=>setDesc(e.target.value)}
              >
              </textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form> 
    </div>
  )
}
