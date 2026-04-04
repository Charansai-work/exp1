import { z } from 'zod';

export const signupSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6), role: z.enum(['ADMIN', 'USER']).optional() }) });
export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(6) }) });
export const internshipSchema = z.object({ body: z.object({ title: z.string(), description: z.string(), skills: z.array(z.string()), duration: z.string(), stipend: z.number().int(), deadline: z.string().datetime() }) });
export const applicationStatusSchema = z.object({ body: z.object({ applicationId: z.string(), status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'WAITLISTED']) }) });
export const taskAssignSchema = z.object({ body: z.object({ title: z.string(), description: z.string(), deadline: z.string().datetime(), priority: z.enum(['LOW', 'MEDIUM', 'HIGH']), assignedTo: z.string(), resourceUrl: z.string().optional() }) });
export const feedbackSchema = z.object({ body: z.object({ userId: z.string(), rating: z.number().int().min(1).max(5), comment: z.string(), metricsJson: z.any().optional() }) });
