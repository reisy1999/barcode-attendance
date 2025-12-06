import { PrismaClient } from '@prisma/client'

// クラスからインスタンス作成するobj
const prisma = new PrismaClient()

//会議一覧を取得
export async function GET(
    request:Request,
){
    const meetings = await prisma.meeting.findMany()
    return Response.json(meetings)
}