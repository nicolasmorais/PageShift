import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDb();
    const routes = db.data.routes;
    return NextResponse.json(routes);
  } catch (error) {
    console.error('Failed to get routes:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { path, contentId } = await req.json();
    if (!path || !contentId) {
      return NextResponse.json({ message: 'Path and contentId are required' }, { status: 400 });
    }

    const db = await getDb();
    const routeIndex = db.data.routes.findIndex(r => r.path === path);

    if (routeIndex === -1) {
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
    }

    db.data.routes[routeIndex].contentId = contentId;
    await db.write();

    return NextResponse.json({ message: 'Route updated successfully', route: db.data.routes[routeIndex] });
  } catch (error) {
    console.error('Failed to update route:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}