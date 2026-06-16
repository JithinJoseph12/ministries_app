import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Ministry from '@/src/lib/models/Ministry';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Ministry ID is required' }, { status: 400 });
    }

    const deletedMinistry = await Ministry.findByIdAndDelete(id);
    
    if (!deletedMinistry) {
        return NextResponse.json({ success: false, message: 'Ministry not found' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: 'Ministry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting ministry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete ministry', error: error.message },
      { status: 500 }
    );
  }
}
