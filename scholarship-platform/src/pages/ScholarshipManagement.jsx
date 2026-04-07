import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { ScholarshipContext } from "../context/ScholarshipContext";

export default function ScholarshipManagement() {
 const {
  scholarships,
  addNewScholarship,
  editScholarship,
  removeScholarship,
} = useContext(ScholarshipContext);

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Add Scholarship
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    addNewScholarship({
  title: formData.get("title"),
  category: formData.get("category"),
  amount: Number(formData.get("amount")),
  deadline: formData.get("deadline"),
  description: formData.get("description"),
});

    e.target.reset();
    setShowAdd(false);
  };

  // Start Editing
  const startEdit = (sch) => {
    setEditingId(sch.id);
    setEditData(sch);
  };

  // Save Edit
  const handleSave = (id) => {
   editScholarship(id, editData);
    setEditingId(null);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Scholarship Management</h2>

        {/* Scholarship Control Section */}
        <div className="action-card admin-action">
          <h3>Scholarship Control</h3>
          <p>Add, edit, or remove scholarship listings.</p>

          <button
            className="btn-primary"
            onClick={() => setShowAdd(!showAdd)}
          >
            {showAdd ? "Close Form" : "Add Scholarship"}
          </button>
        </div>

        {/* Add Form */}
    {showAdd && (
  <div className="form-card">
    <h3 className="form-title">Add New Scholarship</h3>

    <form onSubmit={handleAdd} className="admin-form">

      <div className="form-grid">

        <div className="form-field">
          <label>Title</label>
          <input name="title" type="text" required />
        </div>

        <div className="form-field">
          <label>Category</label>
          <select name="category" required>
            <option value="">Select Category</option>
            <option value="Merit">Merit</option>
            <option value="Need-Based">Need-Based</option>
            <option value="Gender">Gender</option>
            <option value="Sports">Sports</option>
            <option value="Research">Research</option>
            <option value="Minority">Minority</option>
            <option value="Global">Global</option>
          </select>
        </div>

        <div className="form-field">
          <label>Amount (₹)</label>
          <input name="amount" type="number" required />
        </div>

        <div className="form-field">
          <label>Deadline</label>
          <input name="deadline" type="date" required />
        </div>

        <div className="form-field full-width">
          <label>Description</label>
          <textarea name="description" rows="4" required />
        </div>

      </div>

      <button type="submit" className="btn-primary full">
        Save Scholarship
      </button>
    </form>
  </div>
)}

        {/* Existing Scholarships */}
        <div className="dashboard-content" style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {scholarships.length === 0 && <p>No scholarships available.</p>}

          {scholarships.map((sch) => (
            <div key={sch.id} className="card" style={{ width: "300px" }}>
              {editingId === sch.id ? (
                <>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />

                  <input
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        amount: Number(e.target.value),
                      })
                    }
                  />

                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        deadline: e.target.value,
                      })
                    }
                  />

                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                  />

                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="btn-primary"
                      onClick={() => handleSave(sch.id)}
                      style={{ marginRight: "10px" }}
                    >
                      Save
                    </button>

                    <button
                      className="btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4>{sch.title}</h4>
                  <p><strong>Category:</strong> {sch.category}</p>
                  <p><strong>Amount:</strong> ₹{sch.amount}</p>
                  <p><strong>Deadline:</strong> {sch.deadline}</p>

                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="btn"
                      onClick={() => startEdit(sch)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn"
                      onClick={() => removeScholarship(sch.id)}
                      style={{ backgroundColor: "#dc2626" }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}