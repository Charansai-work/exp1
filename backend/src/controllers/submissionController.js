import { prisma } from '../config/prisma.js';

export const submitTask = async (req, res) => {
  const submission = await prisma.submission.create({
    data: {
      taskId: req.body.taskId,
      userId: req.user.id,
      content: req.body.content,
      githubUrl: req.body.githubUrl,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null
    }
  });
  res.status(201).json(submission);
};

export const listTaskSubmissions = async (req, res) => {
  const submissions = await prisma.submission.findMany({ where: { taskId: req.params.id } });
  res.json(submissions);
};
