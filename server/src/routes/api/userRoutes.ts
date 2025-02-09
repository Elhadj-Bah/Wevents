import { Router, Request, Response } from 'express';
import { createUser } from '../../service/userService.js'; // Ensure the correct relative path and file extension

const router = Router();

router.post('/users', async (req: Request, res: Response) => {
  const { username, password, city, state } = req.body;

  if (!username || !password || !city || !state) {
    console.log('Validation error: All fields are required');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await createUser({ username, password, city, state });
    console.log('User registered successfully:', user);
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
});

export default router;