import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import User from '@/src/lib/models/User';
import Ministry from '@/src/lib/models/Ministry'; // Required for populate to work correctly
import { getUserFromToken } from '@/src/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const currentUser = await getUserFromToken();
        if (!currentUser || currentUser.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        
        const users = await User.find({_id: { $ne: currentUser._id }}).populate('ministryId', 'name').sort({ createdAt: -1 });
        
        return NextResponse.json({ success: true, count: users.length, users }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch users', error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const currentUser = await getUserFromToken();
        if (!currentUser || currentUser.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        
        const body = await request.json();
        
        const { firstName, lastName, email, password, role, ministryId, profession } = body;
        
        if (!firstName || !lastName || !email || !password) {
             return NextResponse.json({ success: false, message: 'Please provide all required fields' }, { status: 400 });
        }

        // Ensure email doesn't exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'admin',
            ministryId: ministryId || null,
            profession: profession || ""
        });
        
        return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, message: 'Failed to create user', error: error.message }, { status: 500 });
    }
}
