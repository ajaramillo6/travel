import Slider from "../slider/Slider";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">Welcome to Our</span>
            <span className="headerTitleLg">Top Places to Travel in {new Date().getFullYear()}</span>
        </div>
        <Slider />
    </div>
  )
}
