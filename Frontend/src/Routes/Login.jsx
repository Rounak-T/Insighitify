import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Redux/AuthSlice";
import { userInfo } from "../Redux/UserSlice";

import UI from "../Components/UI";
import "../../CSS/Register.css";

export default function Login() {
  const token = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      dispatch(login(data.token));
      dispatch(
        userInfo({
          name: data.name,
          email: data.email,
          income: data.income,
          expense: data.expense,
          savingsgoal: data.savingsgoal,
          monthlyStats: data.monthlyStats
        })
      );
      console.log("User Registered");
      navigate("/dashboard");
    } else {
      throw new Error("Login Failed");
    }
  };

  return (
    <>
      <UI>
        <div>
          <h2>Welcome back! Please log in.</h2>
          <form onSubmit={handleSubmit} className="fs-form">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
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
