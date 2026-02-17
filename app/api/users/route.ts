import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword, generatePassword } from '@/lib/password';
import { checkAdminRole } from '@/lib/auth';

export async function GET(request: NextRequest) {
  if (!checkAdminRole(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const users = db
      .prepare(
        'SELECT id, username, full_name as fullName, email, role, created_at as createdAt FROM users ORDER BY created_at DESC'
      )
      .all();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminRole(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const { username, fullName, email, password, role } = await request.json();

    if (!username || !fullName || !email || !role) {
      return NextResponse.json(
        { error: 'Username, full name, email, and role are required' },
        { status: 400 }
      );
    }

    const finalPassword = password || generatePassword();
    const hashedPassword = await hashPassword(finalPassword);

    const stmt = db.prepare(
      'INSERT INTO users (username, full_name, password, email, role) VALUES (?, ?, ?, ?, ?)'
    );

    try {
      const result = stmt.run(username, fullName, hashedPassword, email, role);
      const user = db
        .prepare(
          'SELECT id, username, full_name as fullName, email, role, created_at as createdAt FROM users WHERE id = ?'
        )
        .get(result.lastInsertRowid);

      return NextResponse.json({ user, generatedPassword: !password ? finalPassword : null });
    } catch (error) {
      if (error instanceof Error && (error as { code?: string }).code === 'SQLITE_CONSTRAINT') {
        return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
