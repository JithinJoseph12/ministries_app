import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Event from '@/src/lib/models/Event';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Event ID is required' }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
        return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

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
