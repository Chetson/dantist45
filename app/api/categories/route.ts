import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const categories = db.prepare('SELECT * FROM service_categories ORDER BY order_index ASC, name ASC').all();
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, order_index } = await request.json();
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const result = db.prepare(
            'INSERT INTO service_categories (name, order_index) VALUES (?, ?)'
        ).run(name, order_index || 0);

        return NextResponse.json({ id: result.lastInsertRowid, name, order_index: order_index || 0 });
    } catch (error) {
        console.error('Failed to create category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
