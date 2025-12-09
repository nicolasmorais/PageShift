import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const DB_DIR_PATH = process.env.DATABASE_DIR || './data';
    const DB_FILE_NAME = 'db.json';
    const DB_FULL_PATH = path.resolve(process.cwd(), DB_DIR_PATH, DB_FILE_NAME);
    
    const dirExists = fs.existsSync(path.dirname(DB_FULL_PATH));
    const fileExists = fs.existsSync(DB_FULL_PATH);
    
    let fileContent = null;
    if (fileExists) {
      try {
        const content = fs.readFileSync(DB_FULL_PATH, 'utf-8');
        fileContent = JSON.parse(content);
      } catch (e) {
        fileContent = { error: 'Failed to parse JSON' };
      }
    }
    
    const db = await getDb();
    
    return NextResponse.json({
      databasePath: DB_FULL_PATH,
      directoryExists: dirExists,
      fileExists,
      fileContent: fileContent ? {
        keys: Object.keys(fileContent),
        routesCount: fileContent.routes?.length || 0,
        customAdvertorialsCount: fileContent.customAdvertorials?.length || 0,
      } : null,
      dbData: {
        routesCount: db.data.routes.length,
        customAdvertorialsCount: db.data.customAdvertorials.length,
        routes: db.data.routes,
        customAdvertorials: db.data.customAdvertorials.map(a => ({
          id: a.id,
          name: a.name,
        })),
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_DIR: process.env.DATABASE_DIR,
        cwd: process.cwd(),
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}