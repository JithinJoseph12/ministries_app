import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Ministry from '@/src/lib/models/Ministry';
import { getUserFromToken } from '@/src/lib/auth';

export async function POST(request) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    
    const body = await request.json();
    
    // Create new ministry
    const newMinistry = await Ministry.create({
      name: body.ministryName,
      category: body.category,
      missionStatement: body.missionStatement,
      fullDescription: body.fullDescription,
      yearFounded: body.yearFounded,
      primaryLocation: body.primaryLocation,
      serviceArea: body.serviceArea,
      website: body.website,
      email: body.email,
      whatWeDo: body.whatWeDo,
      whoWeServe: body.whoWeServe,
      leader: body.leader,
      // You can add logic for events if you want defaults handled dynamically
    });
    
    return NextResponse.json(
      { success: true, message: 'Ministry created successfully', ministry: newMinistry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create ministry', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    let query = {};
    if (user.role === 'admin') {
      // Admin can only see their own ministry
      if (!user.ministryId) {
        return NextResponse.json({ success: true, count: 0, ministries: [] }, { status: 200 });
      }
      query = { _id: user.ministryId };
    }

    // Fetch ministries, sort by newest first
    const ministries = await Ministry.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, count: ministries.length, ministries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch ministries', error: error.message },
      { status: 500 }
    );
  }
}
