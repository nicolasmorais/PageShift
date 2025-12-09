import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { defaultDbData } from '@/lib/advertorial-types';

export async function POST() {
  try {
    const db = await getDb();
    
    // Re-initialize with default data if needed
    if (!db.data.routes || db.data.routes.length === 0) {
      db.data.routes = defaultDbData.routes;
    }
    if (!db.data.approvalPageContent) {
      db.data.approvalPageContent = defaultDbData.approvalPageContent;
    }
    if (!db.data.customAdvertorials) {
      db.data.customAdvertorials = defaultDbData.customAdvertorials;
    }
    
    await db.write();
    
    return NextResponse.json({
      message: 'Database initialized successfully',
      routesCount: db.data.routes.length,
      customAdvertorialsCount: db.data.customAdvertorials.length,
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}