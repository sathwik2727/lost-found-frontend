import { useEffect, useState } from "react";
import { getItems, claimItem, deleteItem } from "../api/itemApi";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await getItems({ search: search || undefined, type: type || undefined });
      setItems(res.data);
      setError("");
    } catch (e) {
      setError("Cannot reach the backend. Is Spring Boot running on port 8080?");
    }
  };

  useEffect(() => { load(); }, [type]);

  const handleClaim = async (id) => { await claimItem(id); load(); };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) { await deleteItem(id); load(); }
  };

  return (
    <>
      <div className="filters">
        <input
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button onClick={load}>Search</button>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {items.map((i) => (
          <ItemCard key={i.id} item={i} onClaim={handleClaim} onDelete={handleDelete} />
        ))}
      </div>
      {!error && items.length === 0 && <p>No items found.</p>}
    </>
  );
}
