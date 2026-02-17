import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('auth');

    if (!authCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const auth = JSON.parse(authCookie.value);

    if (!auth.userId) {
      return NextResponse.json({ error: 'Invalid auth' }, { status: 401 });
    }

    const user = db
      .prepare(
        'SELECT id, username, full_name as fullName, email, role, created_at as createdAt FROM users WHERE id = ?'
      )
      .get(auth.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
