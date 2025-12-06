import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//出席登録
export async function POST(
    request:Request,
){
    const body = await request.json()
    const attendance = await prisma.attendance.create({
        data: {
            staffId: body.staffId,
            meetingId: body.meetingId,
        }
    })
    return Response.json(attendance)
}

//出席確認
export async function GET(
    request:Request,
){
    const url = new URL(request.url)
    const meetingId = url.searchParams.get('meetingId')
    const attendances = await prisma.attendance.findMany({
        where: { meetingId: Number(meetingId) }
    })

    return Response.json(attendances)
}