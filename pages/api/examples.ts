import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/database';
import { Client, QueryResult } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Definindo o tipo para um item de exemplo
interface ExampleItem {
    id: string; // Usando string/UUID para PostgreSQL
    name: string;
    createdAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  let client: Client | null = null;
  try {
    client = await getDb(); // Get the PostgreSQL Client

    // Garantir que a tabela 'examples' exista (não estava no ensureTablesExist)
    await client.query(`
        CREATE TABLE IF NOT EXISTS examples (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    if (req.method === 'GET') {
      // Handle GET requests to fetch examples
      const result: QueryResult = await client.query('SELECT id, name, created_at as "createdAt" FROM examples ORDER BY created_at DESC');
      const examples: ExampleItem[] = result.rows;
      res.status(200).json(examples);
      return;
    } else if (req.method === 'POST') {
      // Handle POST requests to create a new example
      const { name } = req.body as { name: string };
      if (!name) {
        res.status(400).json({ message: 'O nome é obrigatório' });
        return;
      }

      const newId = uuidv4();
      const newExample: ExampleItem = {
        id: newId,
        name,
        createdAt: new Date().toISOString(),
      };

      // Insert the new example
      await client.query(
        'INSERT INTO examples (id, name, created_at) VALUES ($1, $2, $3)',
        [newId, name, newExample.createdAt]
      );

      res.status(201).json(newExample);
      return;
    } else {
      // Method Not Allowed for other HTTP methods
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
      return;
    }
  } catch (error: any) {
    console.error('Database operation failed:', error.message || error);
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message || 'Unknown error' });
    return;
  }
}