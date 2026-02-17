import db from '../lib/db';
import { hashPassword } from '../lib/password';

async function createAdmin() {
  const username = 'admin';
  const password = 'admin123';
  const fullName = 'Администратор';
  const email = 'admin@example.com';
  const role = 'admin';

  const hashedPassword = await hashPassword(password);

  try {
    const stmt = db.prepare(
      'INSERT INTO users (username, full_name, password, email, role) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(username, fullName, hashedPassword, email, role);
    console.log('Admin user created successfully');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Role:', role);
  } catch (error) {
    console.log('Admin user already exists or error occurred');
    console.error(error);
  }

  db.close();
}

createAdmin();
