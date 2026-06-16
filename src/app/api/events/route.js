import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Event from '@/src/lib/models/Event';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Create new event
    const newEvent = await Event.create({
      title: body.title,
      category: body.category,
      hostMinistry: body.hostMinistry,
      shortDescription: body.shortDescription,
      description: body.description,
      startDate: body.startDate,
      startTime: body.startTime,
      endDate: body.endDate,
      endTime: body.endTime,
      allDay: body.allDay,
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

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all events, sort by start date (newest first, or oldest first if preferred. Usually upcoming first, but we can do start date ascending or descending).
    // Sorting by startDate descending is easy:
    const events = await Event.find({}).sort({ startDate: -1 });
    
    return NextResponse.json(
      { success: true, count: events.length, events },
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
