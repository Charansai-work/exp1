import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';

export const signup = async (req, res) => {
  const { name, email, password, role = 'USER' } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashed, role } });
  res.status(201).json({ id: user.id, email: user.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });
  const payload = { id: user.id, role: user.role, email: user.email };
  res.json({ accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload), user: payload });
};

export const refresh = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: 'Missing refresh token' });
  const payload = verifyRefreshToken(token);
  res.json({ accessToken: signAccessToken({ id: payload.id, role: payload.role, email: payload.email }) });
};
