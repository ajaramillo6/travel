import './subscribe.css';
import { useState, useEffect, useContext } from "react";
// import {axiosInstance} from "../../config";
import axios from 'axios';
import { Context } from "../../context/Context";

export default function Subscribe({post}) {

    const { user } = useContext(Context);

    const postCommentList = post.postComments;
    const postLikesList = post.postLikes;

    const[subscriberEmail, setSubscriberEmail] = useState("");
    const[subscriberName, setSubscriberName] = useState("");
    const[subscribers, setSubscribers] = useState([]);
    const[subscribersList, setSubscribersList] = useState([]);
    const[showSubscribe, setShowSubscribe] = useState(false);
    const[subscriberCommentEmail, setSubscriberCommentEmail] = useState("");
    const[subscriberComment, setSubscriberComment] = useState("");
    const[currentCommentId, setCurrentCommentId] = useState("");
    const[subscriberErrorComments, setSubscriberErrorComments]=useState(false);
    const[showComment, setShowComment] = useState(false);
    const[showMoreComments, setShowMoreComments] = useState(false);
    const[subscriberSuccess, setSubscriberSuccess] = useState(false);
    const[subscriberError, setSubscriberError]=useState(false);
    const[likes, setLikes] = useState([]);
    const[isLiked, setIsLiked] = useState(false);
    const[isDBLiked, setIsDBLiked] = useState(false);
    const[alreadyLiked, setAlreadyLiked] = useState(false);
    const[isCommentLiked, setIsCommentLiked] = useState(false);
    const[isDBCommentLiked, setIsDBCommentLiked] = useState(false);
    const[saveToLocal, setSaveToLocal] = useState(false);
    const[deleteFromLocal, setDeleteFromLocal] = useState(false);

    useEffect(()=> {
        setIsLiked(likes.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(subscriberCommentEmail));
        postLikesList && setIsDBLiked(postLikesList.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(subscriberCommentEmail));
    }, [postLikesList, likes, user, subscriberCommentEmail]);

    useEffect(() => {
        if(!user){
            postCommentList && setIsDBCommentLiked(postCommentList.map((l)=>l.commentLikesList.map(s=>s.subscriberCommentEmail)).join().includes(subscriberCommentEmail));
        }else{
            postCommentList && setIsDBCommentLiked(postCommentList.map((l)=>l.commentLikesList.map(s=>s.subscriberCommentEmail)).join().includes(user.username));
        }
    }, [subscriberCommentEmail, postCommentList])

    useEffect(()=>{
        setLikes([]);
    },[post._id])

    useEffect(()=> {
        if(!user){
            let currentSubscriber;
            if(subscriberCommentEmail !== ""){
                for(let i = 0; i < subscribersList.length; i++){
                    if(subscribersList[i].subscriberEmail === subscriberCommentEmail){
                        currentSubscriber = subscribersList[i].subscriberName;
                    }
                }
            }
            if(postCommentList){
                if(postCommentList.map((subscriber) => subscriber.subscriberCommentEmail).includes(currentSubscriber)){
                    for(let i = 0; i < postCommentList.length; i++){
                        if(postCommentList[i].subscriberCommentEmail === currentSubscriber &&
                            postCommentList[i].commentId === currentCommentId){
                            postCommentList.splice(i, 1);
                        }
                    }
                }
            }
        } else {
            if(postCommentList){
                for(let i = 0; i < postCommentList.length; i++){
                    if(postCommentList[i].commentId === currentCommentId){
                        postCommentList.splice(i, 1);
                    }
                }
            }
        }
    },[postCommentList && postCommentList.length])

    //Get all subscribers
    useEffect(()=> {
        const fetchSubscribers = async() => {
          const res = await axios.get("/subscribers");
          setSubscribersList(res.data.sort((a,b)=>
          a.subscriberName.localeCompare(b.subscriberName)
        ));
        }
        fetchSubscribers();
      },[subscriberSuccess]);

    //HANDLES ADDED COMMENTS
    const handleSubmitComment = async(e) => {
        e.preventDefault();

        let subscriberCommentName;
        for(let s=0; s<subscribersList.length; s++){
            if(subscribersList[s].subscriberEmail === subscriberCommentEmail){
                subscriberCommentName = subscribersList[s].subscriberName;
            }
        }

        const newComment = {
          subscriberCommentEmail: user ? user.username : subscriberCommentEmail,
          subscriberComment,
          subscriberCommentName: user ? user.username : subscriberCommentName,
          commentPic: user ? user.profilePic : subscriberCommentEmail[0].toUpperCase(),
          commentForPost: post._id,
          commentLikesList: [],
          commentId: Date.now(),
          commentCreatedAt: new Date().toLocaleDateString("en-US", 
            {year: 'numeric', month: 'short', day: 'numeric'}
            ),
        }
        if(subscriberCommentEmail !== "" && subscriberComment !== "" && 
        (subscribersEmails.includes(subscriberCommentEmail) || subscribersEmailsDB.includes(subscriberCommentEmail))
        || user.username.includes(subscriberCommentEmail)){
            try{
                await axios.put("/posts/" + post._id + "/updateComment", newComment);
                postCommentList.push(newComment);
            }catch(err){
                console.log(err);
            }
            handleCommentBox();
        }   else {
            handleSubscriberError();
        }
      }

      //HANDLES DELETING COMMENTS
      const handleDeleteComment = async(commentId) => {
        if(!user){
            let currentSubscriber;
            if(subscriberCommentEmail !== ""){
                for(let i = 0; i < subscribersList.length; i++){
                    if(subscribersList[i].subscriberEmail === subscriberCommentEmail){
                        currentSubscriber = subscribersList[i].subscriberName;
                    }
                }
            }else {
                handleSubscriberError();
            }
            if(postCommentList.map((subscriber) => subscriber.subscriberCommentEmail).includes(currentSubscriber)){
                for(let i = 0; i < postCommentList.length; i++){
                    if((postCommentList[i].subscriberCommentEmail === currentSubscriber) &&
                        postCommentList[i].commentId === commentId){
                        setCurrentCommentId(commentId);
                        setSubscriberErrorComments(false);
                        postCommentList.splice(i, 1);
                        try{
                            await axios.put("/posts/" + post._id + "/updateComment", postCommentList);
                        }catch(err){
                            console.log(err);   
                        }
                    }else{
                        setSubscriberErrorComments(true);
                        setTimeout(()=>{setSubscriberErrorComments(false)}, 3000);
                    }
                }
            } else if(!postCommentList.map((subscriber) => subscriber.subscriberCommentEmail).includes(currentSubscriber) && 
            subscriberCommentEmail !== ""){
                setSubscriberErrorComments(true);
                setTimeout(()=>{setSubscriberErrorComments(false)}, 3000);
            }
        } else {
            for(let i = 0; i < postCommentList.length; i++){
                if(postCommentList[i].commentId === commentId){
                    setCurrentCommentId(commentId);
                    postCommentList.splice(i, 1);
                    try{
                        await axios.put("/posts/" + post._id + "/updateComment", postCommentList);
                    }catch(err){
                        console.log(err);   
                    }
                }
            }
        }
    }

    //HANDLES LIKE ADDED TO POST
    const handleLike = async(e) => {
        e.preventDefault();
        const newLike = {
            subscriberCommentEmail: user ? user.username : subscriberCommentEmail,
            likeForPost: post._id,
        }
        if(!user){
            if(subscriberCommentEmail !== "" && 
            (subscribersEmails.includes(subscriberCommentEmail) || subscribersEmailsDB.includes(subscriberCommentEmail))){
                if(!isDBLiked){
                    try {
                        await axios.put("/posts/" + post._id + "/like", newLike)
                        isLiked ? likes.pop() : setLikes((prevLike) => [...prevLike, newLike]);
                    }catch(err) {
                        console.log(err);
                    }
                    setIsLiked(!isLiked);
                } else {
                    handleAlreadyLiked();
                    for(let i = 0; i < postLikesList.length; i++){
                        if(postLikesList[i].subscriberCommentEmail === subscriberCommentEmail){
                            postLikesList.splice(i, 1);
                        }
                    }
                    try {
                        await axios.put("/posts/" + post._id + "/like", newLike)
                    }catch(err) {
                        console.log(err);
                    }
                    setIsDBLiked(!isDBLiked);
                }
            } else {
                handleSubscriberError();
            }
        } else {
            if((!postLikesList.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(user.username))){
                try {
                    await axios.put("/posts/" + post._id + "/like", newLike)
                    likes.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(user.username) ? 
                    likes.pop() : setLikes((prevLike) => [...prevLike, newLike]);
                }catch(err) {
                    console.log(err);
                }
                setIsLiked(!isLiked);
            } else {
                handleAlreadyLiked();
                for(let i = 0; i < postLikesList.length; i++){
                    if(postLikesList[i].subscriberCommentEmail === user.username){
                        postLikesList.splice(i, 1);
                    }
                }
                try {
                    await axios.put("/posts/" + post._id + "/like", newLike)
                }catch(err) {
                    console.log(err);
                }
                setIsDBLiked(!isDBLiked);
            }
        }
    }

    //HANDLES LIKE ADDED TO COMMENT
    const handleLikeComment = async(commentId) => {
        const newCommentLike = {
            subscriberCommentEmail: user ? user.username : subscriberCommentEmail,
            likeForPost: post._id,
            likeForComment: commentId,
        }
        if(!user){
            if(subscriberCommentEmail !== "" && 
                (subscribersEmails.includes(subscriberCommentEmail) || 
                subscribersEmailsDB.includes(subscriberCommentEmail)))
            {
                if(!isDBCommentLiked){
                    let postCommentsLength = postCommentList.length;
                    for(let j = 0; j < postCommentsLength; j++){
                        if(postCommentList[j].commentId === commentId){
                            isCommentLiked ? 
                            postCommentList[j].commentLikesList.pop(): 
                            postCommentList[j].commentLikesList.push(newCommentLike);
                        }
                    }
                    setIsCommentLiked(!isCommentLiked);
                } else {
                    handleAlreadyLiked();
                    let postCommentsLength = postCommentList.length;
                    for(let j = 0; j < postCommentsLength; j++){
                        if(postCommentList[j].commentId === commentId){
                            isDBCommentLiked ? 
                            postCommentList[j].commentLikesList.pop(): 
                            postCommentList[j].commentLikesList.push(newCommentLike);
                        }
                    }
                    setIsDBCommentLiked(!isDBCommentLiked);
                }
                try{
                    await axios.put("/posts/" + post._id + "/updateComment", postCommentList);
                }catch(err){
                    console.log(err);   
                }
            } else {
                handleSubscriberError();
            } 
        } else {
            if(!isDBCommentLiked){
                let postCommentsLength = postCommentList.length;
                for(let j = 0; j < postCommentsLength; j++){
                    if(postCommentList[j].commentId === commentId){
                        isCommentLiked ? 
                        postCommentList[j].commentLikesList.pop(): 
                        postCommentList[j].commentLikesList.push(newCommentLike);
                    }
                }
                setIsCommentLiked(!isCommentLiked);
            } else {
                handleAlreadyLiked();
                let postCommentsLength = postCommentList.length;
                for(let j = 0; j < postCommentsLength; j++){
                    if(postCommentList[j].commentId === commentId){
                        isDBCommentLiked ? 
                        postCommentList[j].commentLikesList.pop(): 
                        postCommentList[j].commentLikesList.push(newCommentLike);
                    }
                }
                setIsDBCommentLiked(!isDBCommentLiked);
            }
            try{
                await axios.put("/posts/" + post._id + "/updateComment", postCommentList);
            }catch(err){
                console.log(err);   
            }
        }
    }

    //HANDLES ADDED SUBSCRIBERS
    const handleSubscribeSubmit = async(e) => {
        e.preventDefault();
        const newSubscriber = {
            subscriberName,
            subscriberEmail,
        }
        if(subscriberEmail !== "" && subscriberName !== ""){
            try{
                await axios.post("/subscribers", newSubscriber);
                setSubscribers((prevSubscribers) => [...prevSubscribers, newSubscriber]);
                handleSubscriberSuccess();
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

      const handleSubscriberSuccess = () => {
        setSubscriberSuccess(!subscriberSuccess);
        setTimeout(()=>{setSubscriberSuccess(false)}, 3000);
      }

      const handleSubscriberError = () => {
        setSubscriberError(!subscriberError);
        setTimeout(()=>{setSubscriberError(false)}, 3000);
      }

      const handleAlreadyLiked = () => {
        setAlreadyLiked(!alreadyLiked);
        setTimeout(()=>{setAlreadyLiked(false)}, 3000);
      }

      //Get from local storage
      useEffect(()=> {
        setSubscriberCommentEmail(JSON.parse(localStorage.getItem("subscriber")) || "");
      },[]);

      //Save subscriber email to local storage
      useEffect(() => {
        saveToLocal && localStorage.setItem("subscriber", JSON.stringify(subscriberCommentEmail))
      }, [saveToLocal]);

      const handleSaveToLocal = () => {
            if(!saveToLocal && subscriberCommentEmail !== ''){
                setSaveToLocal(true);
            }
            setTimeout(()=>{setSaveToLocal(false)}, 3000);
      }

      //Delete subscriber email from local storage
      const handleDeleteFromLocal = () => {
            setDeleteFromLocal(true);
            localStorage.removeItem("subscriber");
            setSubscriberCommentEmail("");
      }

      //Subscriber exists in localstorage check
      const subscriberExists = localStorage.getItem('subscriber');

    //MATCH NAMES WITH EMAILS FOR COMMENTS ON DATABASE
    if(subscribersList && postCommentList){
        for(let s=0; s<subscribersList.length; s++){
            for(let c=0; c<postCommentList.length; c++){
                if(subscribersList[s].subscriberEmail === postCommentList[c].subscriberCommentEmail)
                    postCommentList[c].subscriberCommentEmail = subscribersList[s].subscriberName;
            }
        }
    }

    //LIST OF SUBSCRIBERS FOR VERIFICATION BEFORE COMMENTING OR LIKING POST
    const subscribersEmails = [];

    if(subscribers){
        for(let s=0; s<subscribers.length; s++){
            subscribersEmails.push(subscribers[s].subscriberEmail)
        }
    }

    const subscribersEmailsDB = [];
    if(subscribersList){
        for(let s=0; s<subscribersList.length; s++){
            subscribersEmailsDB.push(subscribersList[s].subscriberEmail)
        }
    }

    //Number formatting on likes and comments
    function numberFormat(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
    }

  return (
    <>
    <div className="subscribe">
    {!user &&
    <>
        <div className="subscribeHeader">Not yet a subscribed member? 
            <span className="subscribeHeaderClick" onClick={handleSubscribeBox}> Click here.</span>
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
        {subscriberSuccess && 
            <div className="notificationSubscriberSuccess">
                <i className="notificationIcon fa-solid fa-circle-check"></i>
                Subscription was successful!
            </div>
        }
    </>
    }
    </div>
    <div className="reply">
        {!user ?
        <div className="replyHeader">Leave a comment and a like below (Only for subscribed members)</div>:
        <div className="replyHeader">
            Hi <span className="replyHeaderUsername">{user.username}</span>! You can comment and like below</div>
        }
        <div className="replyForm">
            {!user &&
            <div className="replyFormSubscriber">
                {(subscriberCommentEmail) ?
                <input 
                    type="email" 
                    placeholder={subscriberCommentEmail}
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
                {!subscriberExists ?
                (
                <>
                    {!saveToLocal ?
                    <div className="replyFormSubscriberSaveBtn" onClick={handleSaveToLocal}> 
                        Remember me
                    </div>:
                    <div className="notificationSubscriberEmailSaved">
                    <i className="notificationIcon fa-solid fa-circle-check"></i>
                        Saved
                    </div>
                    }
                </>
                ):(
                <div className="replyFormSubscriberDelete">
                    <div className="replyFormSubscriberDeleteBtn" onClick={handleDeleteFromLocal}>Clear</div>
                </div>
                )
                }
            </div>
            }
            <div className="subscriberIconsContainer">
                <i className="subscriberIconComment fa-regular fa-comment-dots" onClick={handleCommentBox}></i>
                {postLikesList &&
                    <>
                    <div>
                        {((user && (likes.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(user.username)) || 
                        user && (postLikesList.map((subscriber)=>subscriber.subscriberCommentEmail).join().includes(user.username))) || 
                        (subscriberCommentEmail !== '' && (isLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                        subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net"))) || 
                        (isDBLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                        subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net"))))))) ? 
                        <i className="subscriberIconLikeFilled fa-solid fa-heart" onClick={handleLike}></i>: 
                        <i className="subscriberIconLikeEmpty fa-regular fa-heart" onClick={handleLike}></i>}
                        {((likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length) > 0) && 
                            <span className="subscriberLikesCount">{numberFormat(likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length)}
                            {(likes.filter((l)=> l.likeForPost === post._id).length + postLikesList.filter((l)=> l.likeForPost === post._id).length) === 1 ? " like" : " likes"}</span>}
                    </div>
                    </>
                }
                {subscriberError && 
                <div className="notificationSubscriberError">
                    <i className="notificationIcon fa-solid fa-circle-exclamation"></i>
                    Sorry. Only for subscribed members.
                </div>
                }
                {subscriberErrorComments && 
                <div className="notificationSubscriberErrorComments">
                    <i className="notificationIcon fa-solid fa-circle-exclamation"></i>
                    You can only delete your own comment.
                </div>
                }
                {alreadyLiked && 
                <div className="notificationSubscriberError">
                    <i className="notificationIcon fa-solid fa-circle-exclamation"></i>
                    Post had already been liked.
                </div>
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
                numberFormat((postCommentList.filter((c)=> c.commentForPost === post._id).length)) + " Comments" : 
                numberFormat(postCommentList.filter((c)=> c.commentForPost === post._id).length) + " Comment"}
            </div>
            }
            <>
            {!showMoreComments ?
            <>
                {postCommentList.slice(0,3).filter((c)=> c.commentForPost === post._id).map((comment)=>(
                <div className="commentPrevWrapper" key={comment.commentId}>
                    <div className="commentAddedRow">
                        <div className="commentPicWrapper">
                            {comment.commentPic.length > 1 ? 
                            <img className="commentPic" src={comment.commentPic} alt="" />:
                            <span>{comment.commentPic}</span>
                            }
                        </div>
                        <div className="commentAddedColumn">
                            <div className="commentPrevInfo">
                                <div className="commentPrevUser">
                                    {comment.subscriberCommentName}
                                </div>
                                <div className="commentPrevDate">
                                    {comment.commentCreatedAt}
                                </div>
                            </div>
                            <div className="commentPrevMessage">
                                {comment.subscriberComment}
                            </div>
                            <div className="commentLikeDeleteContainer">
                                {((user && comment.commentLikesList.map(s=>s.subscriberCommentEmail).join().includes(user.username)) || 
                                comment.commentLikesList.length > 0 && subscriberCommentEmail !== '' && 
                                comment.commentLikesList.map(s=>s.subscriberCommentEmail).join().includes(subscriberCommentEmail) &&
                                (isCommentLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                                subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net"))) || 
                                (isDBCommentLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                                subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net")))))) ? 
                                    <i className="commentIconLikeFilled fa-solid fa-heart" onClick={()=>handleLikeComment(comment.commentId)}></i>:
                                    <i className="commentIconLikeEmpty fa-regular fa-heart" onClick={()=>handleLikeComment(comment.commentId)}></i>}
                                <span className="commentLikeText">
                                    {comment.commentLikesList.length > 0 && numberFormat(comment.commentLikesList.length)}
                                </span>
                                <div className="commentDeleteText" onClick={()=>handleDeleteComment(comment.commentId)}>Delete comment</div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </>:<>
                {postCommentList.filter((c)=> c.commentForPost === post._id).map((comment, i)=>(
                <div className="commentPrevWrapper" key={i}>
                    <div className="commentAddedRow">
                        <div className="commentPicWrapper">
                            {comment.commentPic.length > 1 ? 
                            <img className="commentPic" src={comment.commentPic} alt="" />:
                            <span>{comment.commentPic}</span>
                            }
                        </div>
                        <div className="commentAddedColumn">
                            <div className="commentPrevInfo">
                                <div className="commentPrevUser">
                                    {comment.subscriberCommentName}
                                </div>
                                <div className="commentPrevDate">
                                    {comment.commentCreatedAt}
                                </div>
                            </div>
                            <div className="commentPrevMessage">
                                {comment.subscriberComment}
                            </div>
                            <div className="commentLikeDeleteContainer">
                                {(comment.commentLikesList.length > 0 && subscriberCommentEmail !== '' && 
                                comment.commentLikesList.map(s=>s.subscriberCommentEmail).join().includes(subscriberCommentEmail) &&
                                (isCommentLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                                subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net"))) || 
                                (isDBCommentLiked && (subscriberCommentEmail.includes("@") && (subscriberCommentEmail.includes(".co") || 
                                subscriberCommentEmail.includes(".org") || subscriberCommentEmail.includes(".net")))))) ? 
                                <i className="commentIconLikeFilled fa-solid fa-heart" onClick={()=>handleLikeComment(comment.commentId)}></i>:
                                <i className="commentIconLikeEmpty fa-regular fa-heart" onClick={()=>handleLikeComment(comment.commentId)}></i>}
                                <span className="commentLikeText">
                                    {comment.commentLikesList.length > 0 && numberFormat(comment.commentLikesList.length)}
                                </span>
                                <div className="commentDeleteText" onClick={()=>handleDeleteComment(comment.commentId)}>Delete comment</div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </>
            }
            <span className="commentsShowMoreText" onClick={handleShowMoreComments}>{(!showMoreComments && postCommentList.length > 3 === 0) && `Show ${postCommentList.length - 3} more comments`}</span>
            <span className="commentsShowMoreText" onClick={handleShowMoreComments}>{(showMoreComments === 0) && "Show less"}</span>
            </>
        </div>
        </>
        }
    </div>
    </>
  )
}
