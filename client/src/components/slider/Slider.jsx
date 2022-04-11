import "./slider.css";
import { useState } from "react";

export default function Slider() {

    const [index, setIndex] = useState(0);

    const images = [
        "/img/travel1.jpg",
        "/img/travel2.jpg",
        "/img/travel3.jpg",
        "/img/travel4.jpg",
        "/img/travel5.jpg",
    ];

    const handleArrow = (direction) => {
        if(direction === "l") {
            setIndex(index !== 0 ? index-1 : 4)
        }
        if(direction === "r") {
            setIndex(index !== 4 ? index+1 : 0)
        }
    }

  return (
    <div className="slider">
            <div className="sliderArrow" style={{left: 0}} onClick = {()=>handleArrow("l")} >
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="sliderImgWrapper" style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map((img, i)=>(
                    <div className="sliderImgContainer" key={i}>
                        <img className="sliderImg" src={img} alt="" />
                    </div>
                ))}
            </div>
            <div className="sliderArrow" style={{right: 0}} onClick = {()=>handleArrow("r")}>
            <i className="fa-solid fa-angle-right"></i>
            </div>
    </div>
  )
}
