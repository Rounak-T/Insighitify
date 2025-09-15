import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../CSS/Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <>
      <header>
        {/* <img src={logo} alt="Insightify Logo" /> */}
        <h2>Insightify</h2>
        <div className="dropdown">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/dashboard" onClick={async() => {try {
              const res = await fetch(`http://localhost:5000/dashboard/`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              if (res.ok) {
                navigate("/dashboard")
              } else {
                alert("Login to visit dashboard");
              }
            } catch (err) {
              console.error(err);
            }}}>Dashboard</Link>
          </div>
          <Link className="btn bL" to="/users/login">
            Login
          </Link>
          <Link className="btn bR" to="/users/register">
            Register
          </Link>
        </div>
      </header>
    </>
  );
}
