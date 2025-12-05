import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDb();
    const settings = db.data.settings;
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { mainPage } = await req.json();
    if (!mainPage || !['/', '/v2', '/v3'].includes(mainPage)) {
      return NextResponse.json({ message: 'Invalid page selected' }, { status: 400 });
    }

    const db = await getDb();
    db.data.settings.mainPage = mainPage;
    await db.write();

    return NextResponse.json({ message: 'Settings updated successfully', settings: db.data.settings });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}