import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const services = db.prepare('SELECT * FROM services ORDER BY order_index ASC, name ASC').all();
        return NextResponse.json(services);
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { category_id, name, price, order_index } = await request.json();
        if (!category_id || !name || !price) {
            return NextResponse.json({ error: 'Category, name, and price are required' }, { status: 400 });
        }

        const result = db.prepare(
            'INSERT INTO services (category_id, name, price, order_index) VALUES (?, ?, ?, ?)'
        ).run(category_id, name, price, order_index || 0);

        return NextResponse.json({ id: result.lastInsertRowid, category_id, name, price, order_index: order_index || 0 });
    } catch (error) {
        console.error('Failed to create service:', error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
