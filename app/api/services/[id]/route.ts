import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { category_id, name, price, order_index } = await request.json();

        if (!category_id || !name || !price) {
            return NextResponse.json({ error: 'Category, name, and price are required' }, { status: 400 });
        }

        db.prepare(
            'UPDATE services SET category_id = ?, name = ?, price = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(category_id, name, price, order_index || 0, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update service:', error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        db.prepare('DELETE FROM services WHERE id = ?').run(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete service:', error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
