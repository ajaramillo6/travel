import './subscribe.css';
import { useState } from "react";
import axios from 'axios';

export default function Subscribe({post}) {

    const postCommentList = post.postComments;
    const subscribersList = post.subscribers; //CHANGE TO CONTEXT
    const postLikesList = post.postLikes;
    
    const[subscriberEmail, setSubscriberEmail] = useState("");
    const[subscriberName, setSubscriberName] = useState("");
    const[subscribers, setSubscribers] = useState([]);
    const[showSubscribe, setShowSubscribe] = useState(false);
    const[subscriberCommentEmail, setSubscriberCommentEmail] = useState("");
    const[subscriberComment, setSubscriberComment] = useState("");
    const[comments, setComments] = useState([]);
    const[showComment, setShowComment] = useState(false);
    const[subscriberError, setSubscriberError]=useState(false);
    const[likes, setLikes] = useState([]);
    const[showMoreComments, setShowMoreComments] = useState(false);

    //HANDLES ADDED COMMENTS
    const handleSubmitComment = async(e) => {
        e.preventDefault();
        const newComment = {
          subscriberCommentEmail,
          subscriberComment,
          commentForPost: post._id,
          commentCreatedAt: new Date().toLocaleDateString("en-US", 
            {year: 'numeric', month: 'short', day: 'numeric'}
            ),
        }
        if(subscriberCommentEmail !== "" && subscriberComment !== "" && 
        subscribersEmails.includes(subscriberCommentEmail)){
            try{
                await axios.put("/posts/" + post._id + "/comment", newComment);
                setComments((prevComments) => [...prevComments, newComment]);
            }catch(err){
                console.log(err);   
            }
            clearFields();
            handleCommentBox();
        }   else {
            handleSubscriberError();
        }
      }

    //HANDLES LIKE ADDED TO POST
    const handleLike = async(e) => {
        e.preventDefault();
        const newLike = {
            subscriberCommentEmail,
            likeForPost: post._id,
        }
        if(subscriberCommentEmail !== ""){
            try{
                await axios.put("/posts/" + post._id + "/like", newLike);
                setLikes((prevLike) => [...prevLike, newLike]);
            }catch(err){
                console.log(err);   
            }
        }
    }

    //**********CHANGE TO CONTEXT ****************/

    //HANDLES ADDED SUBSCRIBERS
    const handleSubscribeSubmit = async(e) => {
        e.preventDefault();
        const newSubscriber = {
            subscriberName,
            subscriberEmail,
        }
        if(subscriberEmail !== "" && subscriberName !== ""){
            try{
                await axios.put("/posts/" + post._id + "/subscriber", newSubscriber);
                setSubscribers((prevSubscribers) => [...prevSubscribers, newSubscriber]);
            }catch(err){
                console.log(err);   
            }
            setShowSubscribe(false); 
        }  
    }

      const handleSubscribeBox = async(e) => {
        setShowSubscribe(!showSubscribe); 
      }

      const handleCommentBox = () => {
        setShowComment(!showComment);
      }

      const handleShowMoreComments = () => {
        setShowMoreComments(!showMoreComments);
      }

      const handleSubscriberError = () => {
        setSubscriberError(!subscriberError);
        setTimeout(()=>{setSubscriberError(false)}, 3000);
      }

      const clearFields = () => {
        setSubscriberCommentEmail("");
        setSubscriberComment("");
      }

    // MATCH NAMES WITH EMAILS FOR COMMENTS ON DATABASE

    if(subscribersList){
        for(let s=0; s<subscribersList.length; s++){
            for(let c=0; c<postCommentList.length; c++){
                if(subscribersList[s].subscriberEmail === postCommentList[c].subscriberCommentEmail)
                    postCommentList[c].subscriberCommentEmail = subscribersList[s].subscriberName;
            }
        }
    }

    // MATCH NAMES WITH EMAILS FOR COMMENTS JUST ENTERED
    
    for(let s=0; s<subscribers.length; s++){
        for(let c=0; c<comments.length; c++){
            if(subscribers[s].subscriberEmail === comments[c].subscriberCommentEmail)
                comments[c].subscriberCommentEmail = subscribers[s].subscriberName;
        }
    }

    //LIST OF SUBSCRIBERS FOR VERIFICATION BEFORE COMMENTING OR LIKING POST
    const subscribersEmails = [];

    for(let s=0; s<subscribers.length; s++){
        subscribersEmails.push(subscribers[s].subscriberEmail)
    }

  return (
    <>
    <div className="subscribe">
        <div className="subscribeHeader">NOT YET A SUBSCRIBED MEMBER? 
            <span className="subscribeHeaderClick" onClick={handleSubscribeBox}> CLICK HERE.</span>
        </div>
        {showSubscribe &&
        <div className="subscribeForm">
            <input 
                type="text" 
                placeholder="Name *" 
                className="subscribeInput" 
                onChange={e=>setSubscriberName(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="Email *" 
                className="subscribeInput" 
                onChange={e=>setSubscriberEmail(e.target.value)}
            />
            <button className="subscribeSubmit" onClick={handleSubscribeSubmit}>
                Subscribe
            </button>
            <div className="subscribeSubmitCancel" onClick={handleSubscribeBox}>
                No Thanks
            </div>
        </div>
        }
    </div>
    <div className="reply">
        <div className="replyHeader">LEAVE A COMMENT AND A LIKE BELOW (ONLY FOR SUBSCRIBED USERS)</div>
        <div className="replyForm">
            {subscriberCommentEmail ?
            <input 
                type="email" 
                placeholder="Confirm Subscribed Email" 
                className="replyInput" 
                onChange={e=>setSubscriberCommentEmail(e.target.value)}
            /> : 
            <input 
                type="email" 
                placeholder="Confirm subscribed email *" 
                value={subscriberCommentEmail}
                className="replyInput" 
                onChange={e=>setSubscriberCommentEmail(e.target.value)}
            />
            }
            <div className="subscriberIconsContainer">
                <i className="subscriberIconComment fa-regular fa-comment-dots" onClick={handleCommentBox}></i>
                {postLikesList &&
                    <>
                    <div>
                        <i className="subscriberIconLike fa-regular fa-heart" onClick={handleLike}></i>
                        {((likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length) > 0) && 
                            <span className="subscriberLikesCount">{likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length}
                            {(likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length) === 1 ? " like" : " likes"}</span>}
                    </div>
                    </>
                }
            </div>
            {showComment &&
            <>
            {subscriberComment ?
             <textarea 
                className="replyText"
                type="text" 
                placeholder="Comment"
                onChange={e=>setSubscriberComment(e.target.value)}>
            </textarea>:
            <textarea 
                className="replyText"
                type="text"
                value={subscriberComment} 
                placeholder="Comment"
                onChange={e=>setSubscriberComment(e.target.value)}>
            </textarea>
            }
            <button className="replySubmit" onClick={handleSubmitComment}>
                Share
            </button>
            {subscriberError && 
                <div className="notificationSubscriberError">
                    <i className="notificationIcon fa-solid fa-circle-exclamation"></i>
                    Sorry. Only for subscribed members.
                </div>
            }
            </>
            }
        </div>
    </div>
    <div className="postCommentContainer">
        {postCommentList &&
        <>
        <div className="commentPrev">
            {postCommentList.filter((c)=> c.commentForPost === post._id).length > 0 &&
            <div className="commentPrevHeader">
                {postCommentList.filter((c)=> c.commentForPost === post._id).length > 1 ? 
                (postCommentList.filter((c)=> c.commentForPost === post._id).length +
                comments.filter((c)=> c.commentForPost === post._id).length) + " COMMENTS" : 
                postCommentList.filter((c)=> c.commentForPost === post._id).length + " COMMENT"}
            </div>
            }
            <>
            {!showMoreComments ?
            <>
                {postCommentList.slice(0,3).filter((c)=> c.commentForPost === post._id).map((comment, i)=>(
                <div className="commentPrevWrapper" key={i}>
                    <div className="commentPrevInfo">
                        <div className="commentPrevUser">
                            {comment.subscriberCommentEmail}
                        </div>
                        <div className="commentPrevDate">
                            {comment.commentCreatedAt}
                        </div>
                    </div>
                    <div className="commentPrevMessage">
                        {comment.subscriberComment}
                    </div>
                </div>
                ))}
            </>:<>
                {postCommentList.filter((c)=> c.commentForPost === post._id).map((comment, i)=>(
                <div className="commentPrevWrapper" key={i}>
                    <div className="commentPrevInfo">
                        <div className="commentPrevUser">
                            {comment.subscriberCommentEmail}
                        </div>
                        <div className="commentPrevDate">
                            {comment.commentCreatedAt}
                        </div>
                    </div>
                    <div className="commentPrevMessage">
                        {comment.subscriberComment}
                    </div>
                </div>
                ))}
            </>
            }
            <span className="commentsShowMoreText" onClick={handleShowMoreComments}>{(!showMoreComments && postCommentList.length > 3 && comments.length === 0) && `Show ${postCommentList.length - 3} more comments`}</span>
            <span className="commentsShowMoreText" onClick={handleShowMoreComments}>{(showMoreComments && comments.length === 0) && "Show less"}</span>
            </>
        </div>
        </>
        }
        <div className="commentAdded">
            {comments.filter((c)=> c.commentForPost === post._id).map((comment, i)=>(
            <div className="commentAddedWrapper" key={i}>
                <div className="commentAddedInfo">
                    <div className="commentAddedUser">
                        {comment.subscriberCommentEmail}
                    </div>
                    <div className="commentAddedDate">
                        {comment.commentCreatedAt}
                    </div>
                </div>
                <div className="commentAddedMessage">
                    {comment.subscriberComment}
                </div>
            </div>
            ))}
        </div>
    </div>
    </>
  )
}
