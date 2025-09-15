import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubs } from "../Redux/DataSlice";
import ExpensePopup from "../Components/Expense";
import AddSubs from "../Components/AddSubs";
import AddIncome from "../Components/AddIncome";

import "../../CSS/Dashboard.css";

import AnimatedList from "../Components/AnimatedList";
import UI from "../Components/UI";
import HeaderDash from "../Components/HeaderDash";
import PieChart from "../Components/PieChart";
import BarGraph from "../Components/BarGraph";
import LineGraph from "../Components/LineGraph";

export default function Dashboard() {

  const [isExpensePopup, setIsExpensePopup] = useState(false);
  const [AddIncomePopup, setAddIncomePopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const token = localStorage.getItem("token");

  const [totalSubsCost, setTotalSubsCost] = useState(0);
  const [recentDues, setRecentDues] = useState([]);
  const dispatch = useDispatch();

  const { list, status } = useSelector((state) => state.subs);
  
  const { name, income, savingsgoal, expense , monthlyStats } = useSelector(
    (state) => state.user
  );

  const currMonth = monthlyStats.find((mon) => mon.month === new Date().toISOString().slice(0, 7))

  const fetchStats = async (token) => {
    const res = await fetch("http://localhost:5000/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setRecentDues(data.recent_dues);
      setTotalSubsCost(
        data.total_monthlySubs_cost + data.total_yearlySubs_cost
      );
    } else {
      throw new Error("Failed to Upcoming Dues");
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats(token);
      dispatch(fetchSubs(token));
    }
  }, [dispatch, token , isPopupOpen , setIsExpensePopup]);

  const items = list;
  const dueItems = recentDues;

  const handleDeleteSubscription = async (sub) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/${sub._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        dispatch(fetchSubs(token));
        fetchStats(token);
      } else {
        console.error("Failed to delete subscription");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UI>
        <HeaderDash />
        <div className="container">
          <div className="comp" id="comp-1">
            <h1>Welcome back, {name ? name.split(" ")[0] : "User"}! 🎉</h1>
            <p>Here’s your subscription overview and spending insights.</p>
          </div>
          <div className="comp" id="comp-2">
            <h4>Income</h4>
            <p>₹{income}</p>
          </div>
          <div className="comp" id="comp-3">
            <h4>Expenses</h4>
            <p>₹{expense}</p>
          </div>
          <div className="comp" id="comp-4">
            <h4>Savings</h4>
            <p>₹{currMonth ?.savings || 0}</p>
          </div>
          <div className="comp" id="comp-5">
            <h4>Subscripton cost</h4>
            <p>₹ {totalSubsCost}</p>
          </div>
          <div className="comp" id="comp-12">
            <h4>Spending Overview</h4>
            <div>
              <div className="grid grid-cols-4 grid-rows-2 gap-4">
                <div className="col-span-2 row-span-2 " id="comp-6">
                  <PieChart />
                </div>
                <div className="col-span-2 row-span-2" id="comp-6">
                  <BarGraph />
                </div>
              </div>
            </div>
          </div>
          <div className="comp" id="comp-9">
            <h4>Active Subscriptions</h4>
            {status === "succeeded" && (
              <AnimatedList
                items={items}
                onItemSelect={(sub) =>
                  console.log("Clicked subscription:", sub)
                }
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={true}
                itemClassName="active-sub-item"
              />
            )}
          </div>

          <div className="comp" id="comp-10">
            <h4>Upcoming Dues</h4>
            <AnimatedList
              items={dueItems}
              onItemSelect={(sub) =>
                console.log(
                  `Clicked due: ${sub.name}, Due in ${sub.daysLeft} days, Date: ${sub.dueDate}`
                )
              }
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
              itemClassName="due-item"
            />
          </div>
          <div className="comp" id="comp-15">
            <h4>Delete Subscription</h4>
            <AnimatedList
              items={items}
              onItemSelect={(sub) => handleDeleteSubscription(sub)}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
              itemClassName="active-sub-item"
            />
          </div>

          <div className="comp" id="comp-11">
            <h4>Manage Subscriptions</h4>
            <div>
              <button onClick={() => {
                setAddIncomePopup(true)
              }} className="btn">Update Income</button>
              <button onClick={() => setIsExpensePopup(true)} className="btn">
                Add Expense
              </button>

              <button onClick={() => setIsPopupOpen(true)} className="btn">Add Subscription</button>
            </div>
          </div>

          <div className="comp" id="comp-13">
            <h4>Savings (Yearly)</h4>
            <div className="chart-container">
              <LineGraph />
            </div>
          </div>
        </div>
        {isExpensePopup && <ExpensePopup onClose={() => setIsExpensePopup(false)} />}
        {isPopupOpen && <AddSubs onClose={() => setIsPopupOpen(false)} />}
        {AddIncomePopup && <AddIncome onClose={() => setAddIncomePopup(false)} />}
      </UI>
    </>
  );
}
