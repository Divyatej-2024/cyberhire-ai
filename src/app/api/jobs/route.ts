/**
 * Jobs API Routes
 * Search and fetch job listings
 */

import { NextRequest, NextResponse } from 'next/server';

// GET jobs with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '20';

    // TODO: Query database with filters
    const jobs = [
      {
        id: '1',
        title: 'SOC Analyst',
        company: 'SecureBank',
        location: 'London, UK',
        workMode: 'hybrid',
        salary: { min: 45000, max: 55000 },
        description: 'Join our Security Operations Center...',
      },
    ];

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: { page: parseInt(page), pageSize: parseInt(pageSize), total: 100 },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
