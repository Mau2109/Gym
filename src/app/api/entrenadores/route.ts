import { NextResponse } from 'next/server';
import db from '@/lib/database';

export async function GET() {
  const [rows] = await db.query(
    'SELECT id, especialidad, disponible FROM Entrenador WHERE disponible = TRUE'
  );
  return NextResponse.json(rows);
}