import "./post.css";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";

export default function Post({ post }) {

const postWords = post.newDescWords;

  //************/CREATE LINKS IN DESC AREA

  const findUrls = [];
  const findIndex = [];
  const createLinks = [];
  const postLinks = [];
  const newPostText = [];
  const newPostWords = [];

  //Find URLS in newDescWords
  for(let i = 0; i < postWords.length; i++){
    if(postWords[i][0] === "["){
      findUrls.push(postWords[i]);
      findIndex.push(i);
    }
  }

  for(let j = 0; j < findUrls.length; j++){
    if(findUrls[j].includes(",")){
      createLinks.push(<a className="postLink" href={findUrls[j].split(",")[0].substring(1).slice(0,-1)}>
        {(findUrls[j].split(",")[1].slice(0,-1).slice(0,-1)).split("-").join(" ")}</a>);
    }
  }

  for(let x = 0; x < createLinks.length; x++){
    postLinks.push([findIndex[x], createLinks[x]]);
  }

  //Insert link objects as replacement for square bracket content
  for (let w = 0; w < postLinks.length; w++){
    newPostText.push(postWords[postLinks[w][0]] = postLinks[w][1]);
  }

  //Create space between words, except if they're objects. Add period if object at end of sentence
  for(let x = 0; x < postWords.length; x++){
    if(typeof postWords[x-1] === 'object' && typeof postWords[x] !== 'object' && 
    (postWords[x][0].toUpperCase() === postWords[x][0])){
      newPostWords.push(". " + postWords[x]);
    } else if (typeof postWords[x-1] === 'object'){
      newPostWords.push(" " + postWords[x]);
    } else {
      newPostWords.push(postWords[x]);
    }
  }

  return (
    <div className="post">
      <Link to={`/post/${post._id}`}  className="link">
        <div>
          {post.photo && (
            <img className="postImg" src={post.photo} alt="" />
          )}
          {post.postLikes.length > 0 && 
          <div className="postLikesContainer">
            <i className="postLikeIcon fa-solid fa-heart"></i> 
            <span className="postLikeCount">
              {post.postLikes.length}
              {post.postLikes.length === 1 ? " like": " likes"}
            </span>
            </div>
          }
          <div className="postInfo">
              <span className="postTitle">{post.title}</span>
              <div className='postUserDate'>
                <span className="postUser">{post.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
          </div>
          {newPostWords ? 
          <div className="postDesc">
            {newPostWords}
          </div>:
          <div className="postDesc">
            {postWords}
          </div>
          }
        </div>
      </Link>
    </div>
  )
}
