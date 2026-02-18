import db from '../lib/db';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const username = 'admin';
  const password = 'admin123';
  const fullName = 'Администратор';
  const email = 'admin@example.com';
  const role = 'admin';

  // Verified hash for admin123
  const hashedPassword = '$2b$10$Vb09YXF9ghVWjj/Q5QhoTOn/Z0iuC1CR/FpOmrrfQdOavBBxMHpYO';

  try {
    // Delete existing admin if any to ensure clean state
    db.prepare('DELETE FROM users WHERE username = ?').run(username);

    const stmt = db.prepare(
      'INSERT INTO users (username, full_name, password, email, role) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(username, fullName, hashedPassword, email, role);
    console.log('Admin user created/updated successfully');
    console.log('Username:', username);
    console.log('Password:', password);
  } catch (error: any) {
    console.log('Error occurred:', error.message);
    console.error(error);
  }

  db.close();
}

createAdmin();
