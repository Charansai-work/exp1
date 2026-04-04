import { prisma } from '../config/prisma.js';

export const me = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, email: true, role: true, skills: true, education: true, resumeUrl: true } });
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.resumeUrl = `/uploads/${req.file.filename}`;
  const user = await prisma.user.update({ where: { id: req.user.id }, data });
  res.json(user);
};
