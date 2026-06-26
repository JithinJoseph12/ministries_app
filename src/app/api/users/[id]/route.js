import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import User from '@/src/lib/models/User';
import { getUserFromToken } from '@/src/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
    try {
        const currentUser = await getUserFromToken();
        if (!currentUser || currentUser.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch user', error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const currentUser = await getUserFromToken();
        if (!currentUser || currentUser.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const { firstName, lastName, email, password, ministryId, profession } = body;

        // Ensure email doesn't conflict
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return NextResponse.json({ success: false, message: 'Email already in use by another user' }, { status: 400 });
            }
        }

        const updates = { firstName, lastName, email };
        if (ministryId !== undefined) {
            updates.ministryId = ministryId || null;
        }
        if (profession !== undefined) {
            updates.profession = profession || "";
        }

        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'User updated successfully', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ success: false, message: 'Failed to update user', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const currentUser = await getUserFromToken();
        if (!currentUser || currentUser.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }
        
        // Prevent deleting oneself
        if (id === currentUser._id.toString()) {
             return NextResponse.json({ success: false, message: 'Cannot delete your own account' }, { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(
            { success: true, message: 'User deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete user', error: error.message },
            { status: 500 }
        );
    }
}
