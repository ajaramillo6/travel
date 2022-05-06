import Slider from "../slider/Slider";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
        <Slider />
        <div className="headerTitles">
            <span className="headerTitleLg">Top Places to Travel in {new Date().getFullYear()}</span>
        </div>
    </div>
  )
}
