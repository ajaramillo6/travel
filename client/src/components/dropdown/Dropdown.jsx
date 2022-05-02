import "./dropdown.css";
import { Link } from "react-router-dom";

export default function Dropdown({cat, states}) {

  return (
    <div>
        {(cat.includes("United States")) &&
            <div className="dropdownStates">
                {states.map((state, x)=>(
                <div key={x}>
                    <Link className="link" to={`/travel/?state=${state}`}>
                        <div className="dropdownState">{state}</div>
                    </Link>
                </div>
                ))}
            </div>
        }
    </div>
  )
}