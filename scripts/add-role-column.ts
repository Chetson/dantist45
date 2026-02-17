import db from '../lib/db';

try {
  db.exec("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'manager'");
  console.log('Column role added successfully');
} catch (error) {
  console.log('Column role might already exist or error occurred');
  console.error(error);
}

db.close();
