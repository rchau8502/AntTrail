import { NextRequest, NextResponse } from 'next/server'
import { auditCourseArticulation } from '@/lib/articulation'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const { targetCampus, targetMajor, courses } = payload

    if (!targetCampus || typeof targetCampus !== 'string') {
      return NextResponse.json({ error: 'targetCampus is required' }, { status: 400 })
    }

    if (!targetMajor || typeof targetMajor !== 'string') {
      return NextResponse.json({ error: 'targetMajor is required' }, { status: 400 })
    }

    if (!Array.isArray(courses)) {
      return NextResponse.json({ error: 'courses must be an array' }, { status: 400 })
    }

    const audit = auditCourseArticulation({
      targetCampus,
      targetMajor,
      courses
    })

    return NextResponse.json({ audit })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to audit course articulation' },
      { status: 500 }
    )
  }
}
