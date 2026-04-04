import { prisma } from '../config/prisma.js';

export const notify = async (userId, message) => prisma.notification.create({ data: { userId, message } });
