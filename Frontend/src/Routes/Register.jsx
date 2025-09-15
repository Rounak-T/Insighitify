import { useNavigate } from "react-router-dom";
import UI from "../Components/UI";
import "../../CSS/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      income: formData.get("income"),
      savingsgoal: formData.get("savingsgoal"),
    };

    console.log(user);

    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        navigate("/users/login");
      } else {
        alert("User already exists");
        navigate("/users/login");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <UI>
        <div>
          <h2>New here? Register to get started.</h2>
          
          <form onSubmit={handleSubmit} className="fs-form">
            <div className="fs-field">
              <label htmlFor="name" className="fs-label">
                Enter Your Name:
              </label>
              <input
                type="text"
                className="fs-input"
                name="name"
                id="name"
                placeholder="Username"
              />
            </div>
            <div className="fs-field">
              <label htmlFor="email" className="fs-label">
                Enter Your Email:
              </label>
              <input
                type="email"
                className="fs-input"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="fs-field">
              <label htmlFor="password" className="fs-label">
                Enter Password:
              </label>
              <input
                type="password"
                className="fs-input"
                name="password"
                id="password"
              />
              <div className="fs-field">
              <label htmlFor="income" className="fs-label">
                Enter Your Income:
              </label>
              <input
                type="number"
                className="fs-input"
                name="income"
                id="income"
                placeholder="Income"
              />
            </div>
              <br/>
              <div className="fs-button-group">
                <button className="fs-button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </UI>
    </>
  );
}
