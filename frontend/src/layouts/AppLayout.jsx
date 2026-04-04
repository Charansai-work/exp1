import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Remote Internship Management</h1>
        <nav className="flex gap-3">
          <Link to="/">Internships</Link>
          {user && <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}>Dashboard</Link>}
          {!user ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
