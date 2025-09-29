import React from 'react';

export default function RecipeList({ recipes, onEdit, onDelete, selected, onToggleSelect }){
  if (!recipes) return null;
  return (
    <div>
      <h3>Recipes</h3>
      {recipes.length === 0 && <div className="muted">No recipes yet.</div>}
      {recipes.map(r => (
        <div key={r._id || r.id} className={"recipe-card " + (selected[r._id] ? 'selected':'' )}>
          <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <strong>{r.title}</strong>
              <div className="small">Serves: {r.servings || 1}</div>
            </div>
            <div className="row">
              <label className="select-box"><input type="checkbox" checked={!!selected[r._id]} onChange={()=>onToggleSelect(r._id)} /> Add</label>
              <button onClick={()=>onEdit(r)}>Edit</button>
              <button onClick={()=>onDelete(r._id)}>Delete</button>
            </div>
          </div>
          <p className="muted">{r.description}</p>
          <ul className="ingredients-list">
            {(r.ingredients||[]).map((ing,i)=> <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
