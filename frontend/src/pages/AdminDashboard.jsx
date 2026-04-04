import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, BarChart, XAxis, YAxis, Bar } from 'recharts';
import api from '../services/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get('/analytics/dashboard').then((res) => setMetrics(res.data));
  }, []);

  if (!metrics) return <div>Loading...</div>;
  const pieData = metrics.applications.map((a) => ({ name: a.status, value: a._count.status }));

  return (
    <div className="space-y-4">
      <div className="card">Internships posted: {metrics.internships}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3>Applications by status</h3>
          <PieChart width={350} height={240}><Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>{pieData.map((_, i) => <Cell key={i} fill={["#6366f1", "#22c55e", "#ef4444", "#f59e0b"][i % 4]} />)}</Pie><Tooltip /></PieChart>
        </div>
        <div className="card">
          <h3>Leaderboard</h3>
          <BarChart width={350} height={240} data={metrics.leaderboard}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="avgRating" fill="#6366f1" /></BarChart>
        </div>
      </div>
    </div>
  );
}
