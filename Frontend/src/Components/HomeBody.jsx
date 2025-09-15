import BodyElement from "./BodyElement";
import "../../CSS/HomeBody.css";
import bodyElementsData from "../assets/bodyElementsData";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";

export default function HomeBody() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="homeBody">
      <div className="itemHolder">
        <h1>Master your Financial future</h1>
        <p>
          Track subscriptions, analyze spending patterns, and gain insights that
          help you make smarter financial decisions.
        </p>
        <button onClick={async() => {try {
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
            }}} >Go to Dashboard <GrFormNextLink /> </button>
      </div>
      <div className="cardsHolder">
        {bodyElementsData.map((item, index) => (
          <BodyElement
            key={index}
            svg={item.svg}
            heading={item.heading}
            para={item.para}
          />
        ))}
      </div>
      <div className="itemHolder">
        <h1>Ready to Take Control?</h1>
        <p>
          Join thousands of users who have transformed their financial habits
          with Insightify.
        </p>
        <button onClick={async() => {try {
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
            }}} >Start your journey <GrFormNextLink /> </button>
      </div>
    </div>
  );
}
