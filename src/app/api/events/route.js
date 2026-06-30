import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Event from '@/src/lib/models/Event';
import { getUserFromToken } from '@/src/lib/auth';


export async function POST(request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const body = await request.json();

    const ministryId = user.role === 'admin' ? user.ministryId : body.ministryId;

    if (user.role !== 'superadmin' && !ministryId) {
      return NextResponse.json({ success: false, message: 'Ministry ID is required' }, { status: 400 });
    }
    
    // Create new event
    let schedules = body.schedules;
    if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
      if (body.startDate) {
        schedules = [{
          startDate: body.startDate,
          startTime: body.startTime,
          endDate: body.endDate,
          endTime: body.endTime,
          allDay: body.allDay || false
        }];
      } else {
        schedules = [];
      }
    }

    const newEvent = await Event.create({
      title: body.title,
      category: body.category,
      hostMinistry: body.hostMinistry,
      ministryId: ministryId || null,
      createdBy: user._id,
      sponsor: body.sponsor,
      shortDescription: body.shortDescription,
      description: body.description,
      schedules: schedules,
      venue: body.venue,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      mapUrl: body.mapUrl,
      contactPerson: body.contactPerson,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      registrationLink: body.registrationLink,
      registrationUrl: body.registrationUrl,
      status: body.status || 'Published',
      visibility: body.visibility || 'Public',
      featured: body.featured || false,
      allowRegistration: body.allowRegistration !== undefined ? body.allowRegistration : true,
    });
    
    return NextResponse.json(
      { success: true, message: 'Event created successfully', event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'list';
    
    const baseQuery = {};
    if (user.role === 'admin') {
      if (!user.ministryId) {
        if (action === 'calendar') {
            return NextResponse.json({ success: true, events: [] }, { status: 200 });
        }
        return NextResponse.json({ 
          success: true, 
          events: [],
          stats: { total: 0, upcoming: 0, draft: 0, completed: 0, upcomingEvents: [] },
          pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 }
        }, { status: 200 });
      }
      baseQuery.ministryId = user.ministryId;
    }

    if (action === 'calendar') {
      const month = parseInt(searchParams.get('month'), 10);
      const year = parseInt(searchParams.get('year'), 10);
      
      let query = { ...baseQuery, status: 'Published' }; // only show published on calendar
      
      let startStr = '';
      let endStr = '';
      if (!isNaN(month) && !isNaN(year)) {
        const formatYMD = (d) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        
        startStr = formatYMD(startOfMonth);
        endStr = formatYMD(endOfMonth);
        
        // Find events whose schedules might intersect with this month
        query.schedules = {
            $elemMatch: {
                startDate: { $lte: endStr }
            }
        };
      }

      const events = await Event.find(query).populate('ministryId', 'name').lean();
      const { generateOccurrencesForWindow, generateRecurrenceSummary } = require('@/src/lib/recurrence');
      
      // Expand occurrences on the backend
      const expandedEvents = events.map(e => {
          if (!e.schedules || e.schedules.length === 0) return { ...e, expandedDates: [] };
          
          let allDates = new Set();
          e.schedules.forEach(schedule => {
              // If no valid end condition, manually filter old "until" if applicable, though the query handles most
              const dates = generateOccurrencesForWindow(schedule, startStr, endStr);
              dates.forEach(d => allDates.add(d));
          });
          
          return {
              ...e,
              hostMinistry: e.hostMinistry || (e.ministryId ? e.ministryId.name : 'Unassigned'),
              expandedDates: Array.from(allDates),
              recurrenceSummary: e.schedules[0] ? generateRecurrenceSummary(e.schedules[0]) : ''
          };
      }).filter(e => e.expandedDates.length > 0); // only return events that actually occur in this month

      return NextResponse.json({ success: true, events: expandedEvents }, { status: 200 });
    }

    // action === 'list'
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All Categories';
    const ministry = searchParams.get('ministry') || 'All Ministries';
    const status = searchParams.get('status') || 'All Status';
    
    let query = { ...baseQuery };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { hostMinistry: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All Categories') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (ministry && ministry !== 'All Ministries') {
      query.hostMinistry = { $regex: ministry, $options: 'i' };
    }

    if (status && status !== 'All Status') {
      query.status = status;
    }

    // Compute stats using YYYY-MM-DD string comparisons
    const formatYMD = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };
    const nowStr = formatYMD(new Date());

    const totalEventsCount = await Event.countDocuments(baseQuery);
    const upcomingCount = await Event.countDocuments({ ...baseQuery, 'schedules.startDate': { $gte: nowStr }, status: 'Published' });
    const draftCount = await Event.countDocuments({ ...baseQuery, status: 'Draft' });
    const completedCount = await Event.countDocuments({ ...baseQuery, 'schedules.startDate': { $lt: nowStr }, status: 'Published' });
    
    const { generateRecurrenceSummary } = require('@/src/lib/recurrence');
    
    // Fetch top 5 upcoming for the sidebar
    let upcomingEvents = await Event.find({ ...baseQuery, 'schedules.startDate': { $gte: nowStr }, status: 'Published' })
      .sort({ 'schedules.startDate': 1 })
      .limit(5).populate('ministryId', 'name').lean();

    upcomingEvents = upcomingEvents.map(e => ({
        ...e,
        hostMinistry: e.hostMinistry || (e.ministryId ? e.ministryId.name : 'Unassigned'),
        recurrenceSummary: e.schedules?.[0] ? generateRecurrenceSummary(e.schedules[0]) : ''
    }));

    const stats = {
      total: totalEventsCount,
      upcoming: upcomingCount,
      draft: draftCount,
      completed: completedCount,
      upcomingEvents
    };

    // Paginated and filtered fetching
    const totalItems = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    let events = await Event.find(query)
      .sort({ 'schedules.startDate': -1 })
      .skip(skip)
      .limit(limit).populate('ministryId', 'name').lean();

    events = events.map(e => ({
        ...e,
        hostMinistry: e.hostMinistry || (e.ministryId ? e.ministryId.name : 'Unassigned'),
        recurrenceSummary: e.schedules?.[0] ? generateRecurrenceSummary(e.schedules[0]) : ''
    }));

    return NextResponse.json(
      { 
        success: true, 
        count: events.length, 
        events,
        stats,
        pagination: { page, limit, totalPages, totalItems }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events', error: error.message },
      { status: 500 }
    );
  }
}
