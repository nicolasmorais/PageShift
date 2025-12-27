import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

interface AutoRouteMapping {
    [slug: string]: string; // Mapeia slug -> advertorialId
}

// GET: Listar todas as rotas automáticas
export async function GET(): Promise<NextResponse> {
    try {
        const client: Client = await getDb();
        
        // Busca o mapeamento de rotas na tabela settings
        const result = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
        
        if (result.rows.length === 0) {
            return NextResponse.json({});
        }

        const routes: AutoRouteMapping = result.rows[0].value;
        return NextResponse.json(routes);

    } catch (error) {
        console.error('Failed to get auto routes:', error);
        return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
    }
}

// POST: Gerar uma nova rota automática
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { advertorialId, slug } = await req.json() as { advertorialId: string, slug?: string };

        if (!advertorialId) {
            return NextResponse.json({ message: 'O ID do advertorial é obrigatório' }, { status: 400 });
        }

        const client: Client = await getDb();

        // Verifica se o advertorial existe
        const advResult = await client.query('SELECT id, name FROM custom_advertorials WHERE id = $1', [advertorialId]);
        if (advResult.rows.length === 0) {
            return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
        }

        // Busca o mapeamento de rotas atual
        const currentRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
        let currentRoutes: AutoRouteMapping = {};
        if (currentRoutesResult.rows.length > 0) {
            currentRoutes = currentRoutesResult.rows[0].value;
        }

        // Define o slug final
        const finalSlug = slug && slug.trim() ? slug.trim() : advertorialId;
        const url = `/${finalSlug}`;

        // Verifica se o slug já está em uso por outro advertorial
        if (currentRoutes[finalSlug] && currentRoutes[finalSlug] !== advertorialId) {
            return NextResponse.json({ message: 'Esta URL personalizada já está em uso por outro advertorial.' }, { status: 409 });
        }

        // Adiciona ou atualiza o mapeamento
        currentRoutes[finalSlug] = advertorialId;

        // Salva o novo mapeamento no banco
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
            ['autoRoutes', JSON.stringify(currentRoutes)]
        );

        return NextResponse.json({ 
            message: 'Rota gerada com sucesso', 
            slug: finalSlug,
            url: url,
            advertorialId: advertorialId
        });

    } catch (error) {
        console.error('Failed to generate auto route:', error);
        return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
    }
}

// DELETE: Excluir uma rota automática
export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const { slug } = await req.json() as { slug: string };

        if (!slug) {
            return NextResponse.json({ message: 'O slug é obrigatório' }, { status: 400 });
        }

        const client: Client = await getDb();

        // Busca o mapeamento de rotas atual
        const currentRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
        
        if (currentRoutesResult.rows.length === 0) {
            return NextResponse.json({ message: 'Nenhuma rota automática encontrada' }, { status: 404 });
        }

        const currentRoutes: AutoRouteMapping = currentRoutesResult.rows[0].value;
        
        // Verifica se a rota existe
        if (!currentRoutes[slug]) {
            return NextResponse.json({ message: 'Rota não encontrada' }, { status: 404 });
        }

        // Remove a rota do mapeamento
        delete currentRoutes[slug];

        // Salva o mapeamento atualizado no banco
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
            ['autoRoutes', JSON.stringify(currentRoutes)]
        );

        return NextResponse.json({ 
            message: 'Rota excluída com sucesso', 
            slug: slug
        });

    } catch (error) {
        console.error('Failed to delete auto route:', error);
        return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
    }
}