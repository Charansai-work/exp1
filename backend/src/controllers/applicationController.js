import { prisma } from '../config/prisma.js';
import { notify } from '../services/notificationService.js';

export const applyInternship = async (req, res) => {
  const application = await prisma.application.create({ data: { userId: req.user.id, internshipId: req.body.internshipId } });
  res.status(201).json(application);
};

export const myApplications = async (req, res) => {
  const data = await prisma.application.findMany({ where: { userId: req.user.id }, include: { internship: true } });
  res.json(data);
};

export const updateApplicationStatus = async (req, res) => {
  const app = await prisma.application.update({ where: { id: req.body.applicationId }, data: { status: req.body.status } });
  await notify(app.userId, `Your application status changed to ${app.status}`);
  res.json(app);
};
