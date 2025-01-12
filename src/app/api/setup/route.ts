import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // Check if any user exists
    const userCount = await prisma.user.count()
    console.log('Current user count:', userCount)

    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Setup has already been completed' },
        { status: 403 }
      )
    }

    const body = await request.json()
    console.log('Request body:', { ...body, password: '[REDACTED]' })

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
      },
    }).catch(error => {
      console.error('Prisma create error:', error)
      throw error
    })

    console.log('User created:', { ...user, password: '[REDACTED]' })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      email: user.email,
    })
  } catch (error) {
    console.error('Detailed setup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create admin user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 