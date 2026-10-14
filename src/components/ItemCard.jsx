export default function ItemCard({ item, onClaim, onDelete }) {
  return (
    <div className="card">
      <span className={`badge ${item.type.toLowerCase()}`}>{item.type}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p><b>Category:</b> {item.category}</p>
      <p><b>Location:</b> {item.location}</p>
      <p><b>Date:</b> {item.date}</p>
      <p><b>Contact:</b> {item.contactName} ({item.contactPhone})</p>
      <p><b>Status:</b> {item.status}</p>
      <div className="actions">
        {item.status === "OPEN" && (
          <button onClick={() => onClaim(item.id)}>Mark Claimed</button>
        )}
        <button className="danger" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  );
}
