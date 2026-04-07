import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { ScholarshipContext } from "../context/ScholarshipContext";


export default function Scholarships() {
const { scholarships } = useContext(ScholarshipContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [amountRange, setAmountRange] = useState("All");
  const [sortOption, setSortOption] = useState("None");

  let filtered = scholarships.filter((sch) => {

    const matchesSearch =
      sch.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || sch.category === category;

    const matchesAmount =
      amountRange === "All" ||
      (amountRange === "Below50" && sch.amount < 50000) ||
      (amountRange === "50to80" && sch.amount >= 50000 && sch.amount <= 80000) ||
      (amountRange === "Above80" && sch.amount > 80000);

    return matchesSearch && matchesCategory && matchesAmount;
  });

  // Sorting
  if (sortOption === "HighToLow") {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  }

  if (sortOption === "DeadlineSoon") {
    filtered = [...filtered].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Available Scholarships</h2>
<h4 className="filter-title">Refine Results</h4>
        {/* Filters */}
        <div className="filter-bar">

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Merit">Merit</option>
            <option value="Need-Based">Need-Based</option>
            <option value="Gender">Gender</option>
            <option value="Sports">Sports</option>
            <option value="Research">Research</option>
            <option value="Minority">Minority</option>
            <option value="Global">Global</option>
          </select>

          <select value={amountRange} onChange={(e) => setAmountRange(e.target.value)}>
            <option value="All">All Amounts</option>
            <option value="Below50">Below ₹50,000</option>
            <option value="50to80">₹50,000 – ₹80,000</option>
            <option value="Above80">Above ₹80,000</option>
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="None">Sort By</option>
            <option value="HighToLow">Amount: High to Low</option>
            <option value="DeadlineSoon">Deadline: Soonest</option>
          </select>

        </div>

        {/* Scholarship Cards */}
        <div className="dashboard-cards">
          {filtered.length > 0 ? (
            filtered.map((sch) => (
              <div key={sch.id} className="card">
                <h3>{sch.title}</h3>
                <p><strong>Category:</strong> {sch.category}</p>
                <p><strong>Amount:</strong> ₹{sch.amount}</p>
                <p><strong>Deadline:</strong> {sch.deadline}</p>

                <Link to={`/apply/${sch.id}`} className="btn">
                  Apply
                </Link>
              </div>
            ))
          ) : (
            <p>No scholarships match your filters.</p>
          )}
        </div>
      </div>
    </>
  );
}