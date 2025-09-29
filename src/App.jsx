import React, {useEffect, useState} from 'react';
import { apiFetch } from './api';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import ShoppingList from './components/ShoppingList';

export default function App(){
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState({}); // id -> {scale, servingsOverride}
  const [editing, setEditing] = useState(null);

  const load = async ()=> {
    const res = await apiFetch('/recipes');
    setRecipes(res || []);
  };

  useEffect(()=> { load(); }, []);

  const handleCreateOrUpdate = async (payload, id=null) => {
    if (id){
      await apiFetch('/recipes/' + id, { method: 'PUT', body: payload });
    } else {
      await apiFetch('/recipes', { method: 'POST', body: payload });
    }
    setEditing(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this recipe?')) return;
    await apiFetch('/recipes/' + id, { method: 'DELETE' });
    await load();
  };

  const toggleSelect = (id) => {
    setSelected(prev => {
      const copy = {...prev};
      if (copy[id]) delete copy[id];
      else copy[id] = { scale: 1 };
      return copy;
    });
  };

  return (
    <div className="container">
      <header><h1>Recipe Planner MVP</h1></header>
      <main>
        <section className="left">
          <RecipeForm onSave={handleCreateOrUpdate} editing={editing} onCancel={()=>setEditing(null)} />
          <RecipeList 
            recipes={recipes} 
            onEdit={(r)=> setEditing(r)} 
            onDelete={handleDelete}
            selected={selected}
            onToggleSelect={toggleSelect}
          />
        </section>
        <aside className="right">
          <ShoppingList selected={selected} recipes={recipes} onRebuild={load} />
        </aside>
      </main>
      <footer>Built with React + Express + MongoDB (MVP)</footer>
    </div>
  );
}
