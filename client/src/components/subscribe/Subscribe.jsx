import './subscribe.css';
import { useState } from "react";

export default function Subscribe({post}) {
    
    const[subscriberCommentEmail, setSubscriberCommentEmail] = useState("");
    const[subscriberComment, setSubscriberComment] = useState("");
    const[subscriberEmail, setSubscriberEmail] = useState("");
    const[subscriberName, setSubscriberName] = useState("");
    const[comments, setComments] = useState([]);

    function postCommentHistory(text) {
        setComments((history) => [...history, text]);
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const newComment = {
        //   commentId: Date.now(),
          subscriberCommentEmail,
          subscriberComment,
          commentsForPost: post._id,
        //   commentTimePosted: new Date().toLocaleDateString(
        //     'en-us', {year:"numeric", month:"short", day:"numeric"}
        //     ),
        }
        postCommentHistory(newComment);
        clearFields();
      }

      const clearFields = () => {
        setSubscriberCommentEmail("");
        setSubscriberComment("");
      }

      for (let i = 0; i < comments.length; i++){
            post.postComments = comments;
      }

  return (
    <>
    <div className="subscribe">
        <div className="subscribeHeader">SUBSCRIBE FOR UPDATES</div>
        <form className="subscribeForm">
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
        </form>
    </div>
    <div className="reply">
        <div className="replyHeader">LEAVE A COMMENT (ONLY FOR SUBSCRIBED USERS)</div>
        <form className="replyForm">
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
        </form>
    </div>
    <div className="comment">
        <div className="commentHeader">COMMENTS</div>
        {comments.filter((c)=> c.commentsForPost ===  post._id).map((comment, i)=>(
        <div className="commentWrapper" key={i}>
            <div className="commentInfo">
                <div className="commentUser">
                    {comment.subscriberCommentEmail}
                </div>
                {/* <div className="commentDate">
                    {comment.commentTimePosted}
                </div> */}
            </div>
            <div className="commentMessage">
                {comment.subscriberComment}
            </div>
        </div>
        ))}
    </div>
    </>
  )
}
