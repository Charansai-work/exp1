import { prisma } from '../config/prisma.js';

export const getMyNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
  res.json(notifications);
};

export const readNotifications = async (req, res) => {
  await prisma.notification.updateMany({ where: { userId: req.user.id, isRead: false }, data: { isRead: true } });
  res.json({ message: 'Marked all as read' });
};
