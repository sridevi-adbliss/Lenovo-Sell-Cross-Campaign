import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import FormSubmission from '@/models/formSubmission';

export async function GET() {
  try {
    await connectDB();

    const total = await FormSubmission.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await FormSubmission.countDocuments({
      submittedAt: { $gte: today }
    });

    const interestDistribution = await FormSubmission.aggregate([
      { $group: { _id: '$deployInterest', count: { $sum: 1 } } }
    ]);

    const timelineDistribution = await FormSubmission.aggregate([
      { $group: { _id: '$timeline', count: { $sum: 1 } } }
    ]);

    const topCountries = await FormSubmission.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        total,
        todayCount,
        interestDistribution,
        timelineDistribution,
        topCountries
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}