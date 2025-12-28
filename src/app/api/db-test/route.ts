import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export async function GET() {
  try {
    // Verifica se a variável de ambiente está definida
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL não está definida nas variáveis de ambiente' }, 
        { status: 500 }
      )
    }

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Desabilitamos SSL por padrão, mas se for um banco na nuvem pode ser necessário ssl: true
      ssl: false,
    })

    const res = await pool.query('SELECT 1 as ok, NOW() as timestamp')
    await pool.end() // Fecha a conexão após o uso

    return NextResponse.json({
      success: true,
      data: res.rows[0],
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Erro na conexão com o banco:', error)
    return NextResponse.json(
      { 
        error: 'Falha na conexão com o banco de dados',
        details: error.message,
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}