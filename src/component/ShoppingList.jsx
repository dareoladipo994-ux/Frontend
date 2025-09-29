import React, {useState} from 'react';
import { apiFetch } from '../api';

export default function ShoppingList({ selected, recipes }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      // Build payload: array of objects { _id, servingsOverride? } or ids
      const payload = { recipes: Object.keys(selected).map(id => ({ _id: id, scale: selected[id].scale || 1 })) };
      const res = await apiFetch('/shopping-list', { method: 'POST', body: payload });
      setItems(res.items || []);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Shopping List</h3>
      <div className="muted">Select recipes on the left, then generate the consolidated shopping list.</div>
      <div style={{marginTop:8}}>
        <button onClick={generate} disabled={loading || Object.keys(selected).length===0}>{loading ? 'Generating...' : 'Generate Shopping List'}</button>
      </div>
      <div style={{marginTop:12}}>
        {items.length===0 && <div className="muted">No items yet.</div>}
        {items.map((it,i)=> (
          <div key={i} className="shopping-item">{it.quantity} {it.unit} — {it.name}</div>
        ))}
      </div>
    </div>
  );
}
