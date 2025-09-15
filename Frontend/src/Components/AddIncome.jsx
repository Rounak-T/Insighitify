import "../../CSS/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../Redux/UserSlice";

export default function ExpensePopup({ onClose }) {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      email,
      income: e.target.income.value,
    };
    try {
      const res = await fetch("http://localhost:5000/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      console.log("Updation req sent")
      if (res.ok) {
        const updatedUser = await res.json();
        console.log("Updation res received")
        dispatch(userInfo(updatedUser)); 
      }
    } catch (err) {
      console.error(err);
    }

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Update Income</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="income"
            placeholder="Amount (₹)"
            required
          />
          <div className="popup-actions">
            <button type="submit" className="btn">
              Save
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
