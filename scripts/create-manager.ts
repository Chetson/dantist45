import db from '../lib/db';
import { hashPassword } from '../lib/password';

async function createManager() {
  const username = 'manager';
  const password = 'manager123';
  const fullName = 'Менеджер';
  const email = 'manager@example.com';
  const role = 'manager';

  const hashedPassword = await hashPassword(password);

  try {
    const stmt = db.prepare(
      'INSERT INTO users (username, full_name, password, email, role) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(username, fullName, hashedPassword, email, role);
    console.log('Manager user created successfully');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Role:', role);
  } catch (error) {
    console.log('Manager user already exists or error occurred');
    console.error(error);
  }

  db.close();
}

createManager();
