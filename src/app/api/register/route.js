import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { uid, email, firstName, lastName, mobile } = data;
    
    // Validate required fields
    if (!uid || !email || !firstName || !lastName || !mobile) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Here you would typically save this data to your database
    // For example, using a database client like Prisma, Mongoose, etc.
    
    // For now, we'll just return a success response
    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}