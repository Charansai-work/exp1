import { prisma } from '../config/prisma.js';
import { notify } from '../services/notificationService.js';

export const giveFeedback = async (req, res) => {
  const previous = await prisma.feedback.findFirst({ where: { userId: req.body.userId, adminId: req.user.id } });
  let feedback;
  if (previous) {
    await prisma.feedbackHistory.create({ data: { feedbackId: previous.id, rating: previous.rating, comment: previous.comment, metricsJson: previous.metricsJson } });
    feedback = await prisma.feedback.update({ where: { id: previous.id }, data: { rating: req.body.rating, comment: req.body.comment, metricsJson: req.body.metricsJson } });
  } else {
    feedback = await prisma.feedback.create({ data: { ...req.body, adminId: req.user.id } });
  }
  await notify(req.body.userId, `New feedback received (rating: ${req.body.rating})`);
  res.status(201).json(feedback);
};

export const getUserFeedback = async (req, res) => {
  const feedback = await prisma.feedback.findMany({ where: { userId: req.params.id }, include: { history: true } });
  res.json(feedback);
};
