import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api/itemApi";

const empty = {
  title: "", description: "", category: "", location: "", date: "",
  type: "LOST", contactName: "", contactPhone: "", contactEmail: "",
};

export default function ReportItem() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem({ ...form, date: form.date || null });
      navigate("/");
    } catch (err) {
      setError("Could not save the item. Check that the backend is running.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Report an Item</h2>
      {error && <p className="error">{error}</p>}
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="LOST">I lost something</option>
        <option value="FOUND">I found something</option>
      </select>
      <input name="title" placeholder="Item name" required value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="category" placeholder="Category (Wallet, Phone...)" value={form.category} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input name="contactName" placeholder="Your name" value={form.contactName} onChange={handleChange} />
      <input name="contactPhone" placeholder="Phone" value={form.contactPhone} onChange={handleChange} />
      <input type="email" name="contactEmail" placeholder="Email" value={form.contactEmail} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
