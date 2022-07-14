import "./slider.css";
import { useState } from "react";

export default function Slider() {

    const [index, setIndex] = useState(0);

    const images = [
        "/img/slider1.jpg",
        "/img/slider2.jpg",
        "/img/slider3.jpg",
        "/img/slider4.jpg",
    ];

    const thumbChange = (i) => {
        const thumb = images[i];
        setIndex(i)
        document.getElementById("mainImg").src = thumb;
    }

  return (
    <>
    <section className="slider">
        <div className="sliderImgWrapper">
        {images.map((slide, i)=>(
            <div className={i === index ? 'slide active' : 'slide'} key={i}>
            {i === index && (
                <img className="sliderImg" id="mainImg" src={slide} alt="" />
            )}
            </div>
        ))}
        </div>
        <div className="sliderThumbnailsContainer">
            <div className="thumbnailsWrapper">
            {images.map((slide, i)=>(
                <div className="sliderThumbnails" key={i}>
                    <div className={index === i ? "sliderThumbnailPicked":"sliderThumbnail"} onClick={()=>thumbChange(i)}>{slide}</div>
                </div>
                ))}
            </div>
            <div className="sliderDown" onClick={()=>window.scrollTo({top: window.innerHeight, left: 0, behavior: 'smooth'})}>
                <i className="fa-solid fa-angle-down"></i>
            </div>
        </div>
    </section>
    </>
  )
}
