import bcrypt from 'bcryptjs';

async function generateHash() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin123', salt);
  console.log('Password hash for admin123:', hash);
}

generateHash();
