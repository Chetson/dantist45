import db from '../lib/db';

try {
  const stmt = db.prepare("UPDATE users SET role = 'admin' WHERE username = 'admin'");
  const result = stmt.run();
  console.log('Updated admin role. Changes:', result.changes);
} catch (error) {
  console.error('Error updating admin role:', error);
}

db.close();
