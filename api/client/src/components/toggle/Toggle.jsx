import './toggle.css';

export default function Toggle({ enableMessaging, onToggle }) {

  return (
    <div className="toggleContainer">
      <label className="toggle">
        <input 
          className="toggleInput" 
          type="checkbox" 
          checked={enableMessaging} 
          onChange={onToggle} 
          />
        <span className="toggleSlider" />
      </label>
    </div>
  )
}
