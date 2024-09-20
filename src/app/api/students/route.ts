import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import prisma from '@/app/lib/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true,
      },
    })
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching students' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const student = await prisma.student.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age,
        grade: body.grade,
      },
    })
    return NextResponse.json(student)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating student' }, { status: 500 })
  }
}