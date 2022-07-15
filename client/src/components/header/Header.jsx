import Slider from "../slider/Slider";
import "./header.css";
import { useState } from "react";
// import {axiosInstance} from "../../config";
import axios from 'axios';

export default function Header() {

  const[subscriberEmail, setSubscriberEmail] = useState("");
  const[subscriberName, setSubscriberName] = useState("");
  const[subscriberSuccess, setSubscriberSuccess] = useState(false);

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
            setSubscriberEmail("");
            setSubscriberName("");
            handleSubscriberSuccess();
        }catch(err){
            console.log(err);   
        }
    }  
}

const handleSubscriberSuccess = () => {
  setSubscriberSuccess(!subscriberSuccess);
  setTimeout(()=>{setSubscriberSuccess(false)}, 3000);
}

  return (
    <div className="header">
      <Slider />
      <div className="headerTitles">
        <span className="headerTitleLg">Top Places to Travel in {new Date().getFullYear()}</span>
        <div className="headerSubscriber">
          <div className="headerSubscriberTitle">WANT TO BECOME A MEMBER? SIGN UP FOR FREE</div>
          <div className="homeSubscribeForm">
            {subscriberName ?
              <input 
                type="text" 
                placeholder="Name *" 
                className="homeSubscribeInput" 
                onChange={e=>setSubscriberName(e.target.value)}
              />:
              <input 
                type="text" 
                placeholder="Name *" 
                value={subscriberName}
                className="homeSubscribeInput" 
                onChange={e=>setSubscriberName(e.target.value)}
              />
            }
            {subscriberEmail ?
              <input 
                type="email" 
                placeholder="Email *" 
                className="homeSubscribeInput" 
                onChange={e=>setSubscriberEmail(e.target.value)}
              />:
              <input 
                type="email" 
                placeholder="Email *" 
                value={subscriberEmail}
                className="homeSubscribeInput" 
                onChange={e=>setSubscriberEmail(e.target.value)}
              />
            }
            {!subscriberSuccess ?
              <button className="homeSubscribeSubmit" onClick={handleSubscribeSubmit}>
                Subscribe
              </button>
              :
              <div className="homeSubscriberSuccess">
                  <i className="notificationIcon fa-solid fa-circle-check"></i>
                  Subscription was successful!
              </div>
            }
          </div>
        </div>
        {/* <div className="subscribeBenefitsContainer">
          <span className="subscribeBenefitsTitle">Membership Benefits</span>
          <div className="subscribeBenefits">
            <i className="subscribeBenefitsIcon fa-solid fa-circle-check"></i>
            <span className="subscribeBenefitsText">Email notifications on new content</span>
          </div>
          <div className="subscribeBenefits">
            <i className="subscribeBenefitsIcon fa-solid fa-circle-check"></i>
            <span className="subscribeBenefitsText">Access to comments and likes</span>
          </div>
          <div className="subscribeBenefits">
            <i className="subscribeBenefitsIcon fa-solid fa-circle-check"></i>
            <span className="subscribeBenefitsText">Access to message authors</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}
