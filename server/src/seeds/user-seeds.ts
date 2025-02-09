import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', password: 'password', city: 'New York', state: 'NY' },
      { username: 'Michael', password: 'password', city: 'San Francisco', state: 'CA' },
      { username: 'Ender', password: 'password', city: 'Portland', state: 'OR' },
      { username: 'Jane', password: 'password', city: 'Chicago', state: 'IL' },

    ],
    { individualHooks: true }
  );
};
