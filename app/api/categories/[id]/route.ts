import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, order_index } = await request.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        db.prepare(
            'UPDATE service_categories SET name = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(name, order_index || 0, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        db.prepare('DELETE FROM service_categories WHERE id = ?').run(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
