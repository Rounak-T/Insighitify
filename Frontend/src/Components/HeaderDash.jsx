import { Link } from "react-router-dom";
import "../../CSS/Header.css";

export default function HeaderDash() {
  return (
    <>
      <header>
        <h2>Insightify</h2>
        <div className="dropdown">
          <div className="links">
            <Link to="/">
              Logout
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
