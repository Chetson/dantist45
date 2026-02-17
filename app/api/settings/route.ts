import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const settings = db.prepare('SELECT * FROM settings').all() as { key: string; value: string }[];
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsMap);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const updateSetting = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

        const transaction = db.transaction((settings: Record<string, string>) => {
            for (const [key, value] of Object.entries(settings)) {
                updateSetting.run(key, value);
            }
        });

        transaction(body);

        return NextResponse.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Failed to update settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
