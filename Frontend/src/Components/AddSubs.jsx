import "../../CSS/styles.css";

export default function AddSubs({ onClose }) {
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subsData = {
      name: e.target.name.value,
      cost: e.target.cost.value,
      billingCycle: e.target.billingCycle.value,
      startDate: e.target.startDate.value,
    };
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers:{ 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"   
      },
        body: JSON.stringify(subsData),
      });
    } catch (err) {
      console.error(err);
    }

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add Subscription</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Subscription" required />
          <input type="number" name="cost" placeholder="Amount (₹)" required />
          <select name="billingCycle" required>
            <option value="">Select Cycle</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input
            type="Date"
            name="startDate"
            placeholder="Start Date"
            required
          />
          <div className="popup-actions">
            <button type="submit" className="btn">
              Add
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
