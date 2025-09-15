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
      title: e.target.title.value,
      expense: e.target.expense.value,
    };
    try {
      const res = await fetch("http://localhost:5000/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      if (res.ok) {
        const updatedUser = await res.json();
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
        <h3>Add Expense</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            required
          />
          <input
            type="number"
            name="expense"
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
