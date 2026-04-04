import { useEffect, useState } from 'react';
import api from '../services/api';

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tasks/my').then((res) => setTasks(res.data));
  }, []);

  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="card">Progress: {progress}% ({completed}/{tasks.length})</div>
      {tasks.map((task) => <div className="card" key={task.id}>{task.title} - {task.status}</div>)}
    </div>
  );
}
