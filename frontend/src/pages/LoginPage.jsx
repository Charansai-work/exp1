import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-md space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>
      <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn w-full">Sign In</button>
    </form>
  );
}
