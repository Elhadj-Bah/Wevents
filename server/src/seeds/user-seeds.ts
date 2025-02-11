import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'Lauruy', password: 'password', city: 'Eugene', state: 'OR' },
      { username: 'Ender', password: 'password', city: 'Provo', state: 'UT' },
      { username: 'Elhadj', password: 'password', city: 'Phoenix', state: 'AZ' },
      { username: 'Dillon', password: 'password', city: 'Boston', state: 'MA' },
      { username: 'Michael', password: 'password', city: 'San Francisco', state: 'CA' },

    ],
    { individualHooks: true }
  );
};
