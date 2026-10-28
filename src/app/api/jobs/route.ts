/**
 * Jobs API Routes
 * Search and fetch job listings
 */

import { NextRequest, NextResponse } from 'next/server';

// GET jobs with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search')?.trim().toLowerCase();
    const location = searchParams.get('location')?.trim().toLowerCase();
    const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number.parseInt(searchParams.get('pageSize') || '20', 10) || 20)
    );

    // TODO: Replace this placeholder with a database-backed job search.
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

    const filteredJobs = jobs.filter((job) => {
      const matchesSearch =
        !search ||
        [job.title, job.company, job.description].some((value) =>
          value.toLowerCase().includes(search)
        );
      const matchesLocation = !location || job.location.toLowerCase().includes(location);
      return matchesSearch && matchesLocation;
    });

    const startIndex = (page - 1) * pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      success: true,
      data: paginatedJobs,
      pagination: { page, pageSize, total: filteredJobs.length },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
