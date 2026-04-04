import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/signup', form);
    navigate('/login');
  };

  return (
    <form onSubmit={submit} className="card mx-auto max-w-md space-y-3">
      <h2 className="text-xl font-semibold">Create Account</h2>
      <input className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn w-full">Sign Up</button>
    </form>
  );
}
