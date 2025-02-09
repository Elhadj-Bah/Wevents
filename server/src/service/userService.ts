import pkg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pkg;

const pool = new Pool();

interface CreateUserParams {
  username: string;
  password: string;
  city: string;
  state: string;
}

export async function createUser({ username, password, city, state }: CreateUserParams) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, city, state) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, city, state]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}