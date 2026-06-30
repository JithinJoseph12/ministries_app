import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Event from '@/src/lib/models/Event';
import { getUserFromToken } from '@/src/lib/auth';

export async function DELETE(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    if (user.role === 'admin' && String(event.ministryId) !== String(user.ministryId)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    await Event.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    const body = await request.json();
    
    const updateData = { ...body };
    if (updateData.ministryId === "") {
        updateData.ministryId = null;
    }

    // fallback for schedules
    if (!updateData.schedules || updateData.schedules.length === 0) {
      if (updateData.startDate) {
        updateData.schedules = [{
          startDate: updateData.startDate,
          startTime: updateData.startTime,
          endDate: updateData.endDate,
          endTime: updateData.endTime,
          allDay: updateData.allDay || false
        }];
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedEvent) {
        return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Event updated successfully', event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, message: 'Failed to update event', error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    const event = await Event.findById(id).lean();
    
    if (!event) {
        return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    if (!event.schedules || event.schedules.length === 0) {
        if (event.startDate) {
            event.schedules = [{
                id: crypto.randomUUID ? crypto.randomUUID() : undefined,
                startDate: event.startDate,
                startTime: event.startTime,
                endDate: event.endDate,
                endTime: event.endTime,
                allDay: event.allDay || false
            }];
        } else {
            event.schedules = [];
        }
    }

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch event', error: error.message }, { status: 500 });
  }
}
