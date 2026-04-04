import { prisma } from '../config/prisma.js';
import { notify } from '../services/notificationService.js';

export const assignTask = async (req, res) => {
  const task = await prisma.task.create({ data: { ...req.body, assignedBy: req.user.id, deadline: new Date(req.body.deadline) } });
  await notify(task.assignedTo, `New task assigned: ${task.title}`);
  res.status(201).json(task);
};

export const myTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { assignedTo: req.user.id }, orderBy: { deadline: 'asc' } });
  res.json(tasks);
};

export const completeTask = async (req, res) => {
  const task = await prisma.task.update({ where: { id: req.params.id }, data: { status: 'COMPLETED' } });
  res.json(task);
};
