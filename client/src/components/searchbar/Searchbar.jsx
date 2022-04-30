import "./searchbar.css";
import { useState } from "react";
import Posts from "../posts/Posts";

export default function Searchbar({posts}) {
    const [query, setQuery] = useState("");

    const keys = ["title", "desc", "loc", "username"];
    console.log(posts)
    const Search = (posts) => {
        return posts.filter((post)=>
            keys.some((key)=>post[key].toLowerCase().includes(query) || 
            post[key].includes(query)))
    }

  return (
    <div className="searchbar">
        <div className="searchbarTitle">Where to Next?</div>
        <div className="searchbarBar">
            <i className="searchbarIcon fa-solid fa-magnifying-glass fa-xs"></i>
            <input 
                type="text" 
                placeholder="Search for a location..." 
                className="search" 
                autoFocus={true} 
                onChange={(e)=>setQuery(e.target.value)}
            />
        </div>
        <Posts posts={Search(posts)} />
    </div>
  )
}
