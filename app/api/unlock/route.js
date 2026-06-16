import { NextResponse } from 'next/server';
import { unlockRateLimit } from '@/lib/cache';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    // Unlock 3 more generations for this IP
    await unlockRateLimit(ip);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unlock API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
