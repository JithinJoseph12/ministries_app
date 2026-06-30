import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Ministry from '@/src/lib/models/Ministry';
import Event from '@/src/lib/models/Event';
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

export async function GET(request) {
  try {
    const user = await getUserFromToken();
    // Allow public access for GET request; if no user, treat as public viewer.

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All Categories';
    const status = searchParams.get('status') || 'All Status';
    
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { primaryLocation: { $regex: search, $options: 'i' } },
        { leader: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All Categories') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (status && status !== 'All Status') {
      query.status = status;
    }

    if (user && user.role === 'admin') {
      // Admin can only see their own ministry
      if (!user.ministryId) {
        return NextResponse.json({ 
          success: true, 
          count: 0, 
          ministries: [],
          stats: { total: 0, active: 0, pending: 0, uniqueCategories: 0 },
          pagination: { page: 1, limit, totalPages: 0, totalItems: 0 }
        }, { status: 200 });
      }
      query._id = user.ministryId;
    }

    // Get overall stats (unfiltered, based on role access)
    const baseQuery = user && user.role === 'admin' ? { _id: user.ministryId } : {};
    const totalMinistriesCount = await Ministry.countDocuments(baseQuery);
    const activeMinistriesCount = await Ministry.countDocuments({ ...baseQuery, status: 'Active' });
    const pendingMinistriesCount = await Ministry.countDocuments({ ...baseQuery, status: 'Pending' });
    const distinctCategories = await Ministry.distinct('category', baseQuery);
    
    const stats = {
      total: totalMinistriesCount,
      active: activeMinistriesCount,
      pending: pendingMinistriesCount,
      uniqueCategories: distinctCategories.length
    };

    // Fetch paginated and filtered ministries
    const totalItems = await Ministry.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;
    
    const ministriesDocs = await Ministry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const ministries = await Promise.all(
      ministriesDocs.map(async (doc) => {
        const eventCount = await Event.countDocuments({ ministryId: doc._id });
        const ministryObj = doc.toObject();
        ministryObj.events = eventCount;
        return ministryObj;
      })
    );
    
    return NextResponse.json(
      { 
        success: true, 
        count: ministries.length, 
        ministries,
        stats,
        pagination: {
          page,
          limit,
          totalPages,
          totalItems
        }
      },
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
