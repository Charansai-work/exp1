import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminPwd = await bcrypt.hash('Admin@123', 10);
  const userPwd = await bcrypt.hash('User@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rims.dev' },
    update: {},
    create: { name: 'Admin One', email: 'admin@rims.dev', password: adminPwd, role: 'ADMIN' }
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@rims.dev' },
    update: {},
    create: { name: 'Student One', email: 'student@rims.dev', password: userPwd, role: 'USER', skills: ['React', 'Node.js'] }
  });

  await prisma.internship.create({
    data: {
      title: 'Full-stack Engineering Intern',
      description: 'Build product features with React and Node.js',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      duration: '3 months',
      stipend: 1200,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
      adminId: admin.id
    }
  });

  console.log('Seed complete', { admin: admin.email, student: student.email });
}

main().finally(() => prisma.$disconnect());
