import { prisma } from '../config/prisma.js';
import { logAdminAction } from '../services/activityService.js';

export const listInternships = async (req, res) => {
  const { page = 1, limit = 10, skills, stipendMin, duration } = req.query;
  const where = {
    ...(skills ? { skills: { has: skills } } : {}),
    ...(stipendMin ? { stipend: { gte: Number(stipendMin) } } : {}),
    ...(duration ? { duration: { contains: duration, mode: 'insensitive' } } : {})
  };
  const [data, total] = await Promise.all([
    prisma.internship.findMany({ where, skip: (Number(page) - 1) * Number(limit), take: Number(limit), orderBy: { createdAt: 'desc' } }),
    prisma.internship.count({ where })
  ]);
  res.json({ data, total, page: Number(page) });
};

export const createInternship = async (req, res) => {
  const internship = await prisma.internship.create({ data: { ...req.body, adminId: req.user.id, deadline: new Date(req.body.deadline) } });
  await logAdminAction(req.user.id, 'CREATE_INTERNSHIP', { internshipId: internship.id });
  res.status(201).json(internship);
};

export const updateInternship = async (req, res) => {
  const internship = await prisma.internship.update({ where: { id: req.params.id }, data: req.body });
  res.json(internship);
};

export const deleteInternship = async (req, res) => {
  await prisma.internship.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
