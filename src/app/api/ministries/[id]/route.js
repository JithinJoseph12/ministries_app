import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import Ministry from '@/src/lib/models/Ministry';
import { getUserFromToken } from '@/src/lib/auth';

export async function DELETE(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

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

export async function PATCH(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Ministry ID is required' }, { status: 400 });
    }

    const body = await request.json();
    
    // Map form data fields to schema fields if necessary
    const updateData = { ...body };
    if (body.ministryName) updateData.name = body.ministryName;

    const updatedMinistry = await Ministry.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedMinistry) {
        return NextResponse.json({ success: false, message: 'Ministry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Ministry updated successfully', ministry: updatedMinistry }, { status: 200 });
  } catch (error) {
    console.error('Error updating ministry:', error);
    return NextResponse.json({ success: false, message: 'Failed to update ministry', error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, message: 'Ministry ID is required' }, { status: 400 });
    }

    const ministry = await Ministry.findById(id);
    
    if (!ministry) {
        return NextResponse.json({ success: false, message: 'Ministry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, ministry }, { status: 200 });
  } catch (error) {
    console.error('Error fetching ministry:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch ministry', error: error.message }, { status: 500 });
  }
}
