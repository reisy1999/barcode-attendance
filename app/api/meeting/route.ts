import { PrismaClient } from '@prisma/client'
import { stringify } from 'querystring'

// クラスからインスタンス作成するobj
const prisma = new PrismaClient()

//会議一覧を取得
export async function GET(
    request:Request,
){
    const meetings = await prisma.meeting.findMany()
    return Response.json(meetings)
}

//会議室作成
export async function POST(
    request:Request,
){
    const body = await request.json()
    const meeting = await prisma.meeting.create({
        data: {
            name: body.name,
            date: body.date,
            place: body.place,
        }
    })
    return Response.json(meeting)
}
