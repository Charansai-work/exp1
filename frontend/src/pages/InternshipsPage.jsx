import { useEffect, useState } from 'react';
import api from '../services/api';

export default function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({ skills: '', stipendMin: '' });

  const load = async () => {
    const { data } = await api.get('/internships', { params: filters });
    setInternships(data.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="card grid grid-cols-3 gap-2">
        <input className="input" placeholder="Skill filter" onChange={(e) => setFilters({ ...filters, skills: e.target.value })} />
        <input className="input" placeholder="Min stipend" onChange={(e) => setFilters({ ...filters, stipendMin: e.target.value })} />
        <button className="btn" onClick={load}>Search</button>
      </div>
      {internships.map((it) => (
        <div key={it.id} className="card">
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p>{it.description}</p>
          <p className="text-sm text-slate-400">{it.duration} • ${it.stipend}</p>
        </div>
      ))}
    </div>
  );
}
