import { PrismaClient } from '@prisma/client'

// クラスからインスタンス作成するobj
const prisma = new PrismaClient()

//職員idが主キー
export async function GET(
    request:Request,
    { params }: {params: {staffId: string}}
){
    const staff = await prisma.staff.findUnique({
        where: { staffId: params.staffId }
    })
}