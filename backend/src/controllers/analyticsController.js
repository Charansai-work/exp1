import { prisma } from '../config/prisma.js';

export const dashboardMetrics = async (_req, res) => {
  const [internships, applications, completedTasks, totalTasks] = await Promise.all([
    prisma.internship.count(),
    prisma.application.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.task.count({ where: { status: 'COMPLETED' } }),
    prisma.task.count()
  ]);

  const leaderboard = await prisma.user.findMany({
    where: { role: 'USER' },
    select: {
      id: true,
      name: true,
      submissions: { select: { id: true } },
      feedbackReceived: { select: { rating: true } }
    }
  });

  const ranked = leaderboard
    .map((u) => ({
      id: u.id,
      name: u.name,
      submissions: u.submissions.length,
      avgRating: u.feedbackReceived.length
        ? u.feedbackReceived.reduce((a, b) => a + b.rating, 0) / u.feedbackReceived.length
        : 0
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  res.json({ internships, applications, taskCompletionRate: totalTasks ? (completedTasks / totalTasks) * 100 : 0, leaderboard: ranked });
};
