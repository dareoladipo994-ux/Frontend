import React, {useState, useEffect} from 'react';

const empty = { title:'', description:'', servings:1, ingredients: [], steps: [] };

function IngredientRow({ing, onChange, onRemove}){
  return (
    <div className="row">
      <input placeholder="name" value={ing.name} onChange={e=>onChange({...ing, name: e.target.value})} />
      <input placeholder="qty" value={ing.quantity} onChange={e=>onChange({...ing, quantity: e.target.value})} />
      <input placeholder="unit" value={ing.unit} onChange={e=>onChange({...ing, unit: e.target.value})} />
      <button onClick={onRemove}>✖</button>
    </div>
  );
}

export default function RecipeForm({ onSave, editing, onCancel }){
  const [data, setData] = useState(empty);

  useEffect(()=> {
    if (editing) setData(editing);
    else setData(empty);
  }, [editing]);

  const addIngredient = ()=> setData(d=> ({...d, ingredients: [...(d.ingredients||[]), {name:'', quantity:0, unit:''}]}));
  const addStep = ()=> setData(d=> ({...d, steps: [...(d.steps||[]), '']}));

  const submit = (e) => {
    e.preventDefault();
    // normalize numbers
    const payload = {...data, servings: Number(data.servings), ingredients: (data.ingredients||[]).map(i=>({...i, quantity: Number(i.quantity)||0}))};
    onSave(payload, data._id);
    setData(empty);
  };

  return (
    <form onSubmit={submit} className="recipe-card">
      <h3>{editing ? 'Edit recipe' : 'New recipe'}</h3>
      <input placeholder="Title" value={data.title} onChange={e=>setData({...data, title: e.target.value})} required />
      <textarea placeholder="Short description" value={data.description} onChange={e=>setData({...data, description: e.target.value})} />
      <input placeholder="Servings" type="number" value={data.servings} onChange={e=>setData({...data, servings: e.target.value})} />
      <div>
        <strong>Ingredients</strong>
        {(data.ingredients||[]).map((ing,i)=> (
          <IngredientRow key={i} ing={ing} onChange={(val)=> {
            const copy = [...data.ingredients]; copy[i]=val; setData({...data, ingredients: copy});
          }} onRemove={()=> { const copy = [...data.ingredients]; copy.splice(i,1); setData({...data, ingredients: copy}); }} />
        ))}
        <button type="button" onClick={addIngredient}>+ Ingredient</button>
      </div>
      <div>
        <strong>Steps</strong>
        {(data.steps||[]).map((s,i)=> (
          <div key={i} className="row">
            <textarea value={s} onChange={e=> { const copy=[...data.steps]; copy[i]=e.target.value; setData({...data, steps: copy}); }} />
            <button type="button" onClick={()=> { const copy=[...data.steps]; copy.splice(i,1); setData({...data, steps: copy}); }}>✖</button>
          </div>
        ))}
        <button type="button" onClick={addStep}>+ Step</button>
      </div>
      <div className="row">
        <button type="submit">{editing ? 'Save changes' : 'Create recipe'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
