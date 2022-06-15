import './subscribe.css';
import { useState } from "react";
import axios from 'axios';

export default function Subscribe({post}) {

    const postCommentList = post.postComments;
    
    const[subscriberCommentEmail, setSubscriberCommentEmail] = useState("");
    const[subscriberComment, setSubscriberComment] = useState("");
    const[subscriberEmail, setSubscriberEmail] = useState("");
    const[subscriberName, setSubscriberName] = useState("");
    const[comments, setComments] = useState([]);
    const[showSubscribe, setShowSubscribe] = useState(false);
    const[showComment, setShowComment] = useState(false);
    const[showMoreComments, setShowMoreComments] = useState(false);

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
        if(subscriberCommentEmail !== "" && subscriberComment !== ""){
            try{
            await axios.put("/posts/" + post._id + "/comment", newComment);
            setComments((prevComments) => [...prevComments, newComment])
            }catch(err){
                console.log(err);   
            }
            clearFields();
            handleCommentBox();
        }   
      }

      const clearFields = () => {
        setSubscriberCommentEmail("");
        setSubscriberComment("");
      }

      const handleSubscribeBox = () => {
        setShowSubscribe(!showSubscribe);
      }

      const handleCommentBox = () => {
        setShowComment(!showComment);
      }

      const handleShowMoreComments = () => {
        setShowMoreComments(!showMoreComments);
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
                placeholder="Name" 
                className="subscribeInput" 
                onChange={e=>setSubscriberName(e.target.value)}
            />
            <input 
                type="email" 
                placeholder="Email" 
                className="subscribeInput" 
                onChange={e=>setSubscriberEmail(e.target.value)}
            />
            <button className="subscribeSubmit">
                Subscribe
            </button>
            <div className="subscribeSubmitCancel" onClick={handleSubscribeBox}>
                No Thanks
            </div>
        </div>
        }
    </div>
    <div className="reply">
        <div className="replyHeader">LEAVE A COMMENT AND SOME LOVE (ONLY FOR SUBSCRIBED USERS)</div>
        <div className="replyForm">
            {subscriberCommentEmail ?
            <input 
                type="email" 
                placeholder="Email" 
                className="replyInput" 
                onChange={e=>setSubscriberCommentEmail(e.target.value)}
            /> : 
            <input 
                type="email" 
                placeholder="Email" 
                value={subscriberCommentEmail}
                className="replyInput" 
                onChange={e=>setSubscriberCommentEmail(e.target.value)}
            />
            }
            <div className="subscriberIconsContainer">
                <i className="subscriberIconLove fa-regular fa-heart"></i>
                <i className="subscriberIconComment fa-regular fa-comment-dots" onClick={handleCommentBox}></i>
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
            </>
            }
        </div>
    </div>
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
    </>
  )
}
