import { prisma } from '../config/prisma.js';

export const logAdminAction = async (adminId, action, meta) => prisma.activityLog.create({
  data: { adminId, action, meta }
});
