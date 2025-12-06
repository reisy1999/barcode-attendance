import { PrismaClient } from '@prisma/client'

// クラスからインスタンス作成するobj
const prisma = new PrismaClient()

//職員idもらって職員情報を返す
export async function GET(
    request:Request,
    { params }: {params: Promise<{ staffId: string }> }
){
    const { staffId } = await params

    const staff = await prisma.staff.findUnique({
        where: { staffId }
    })
    if ( staff === null ){
        return Response.json({error: "職員情報が未登録です" }, {status: 404})
    }
        return Response.json(staff)
}