import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//特定の会議を削除
export async function DELETE(
    request:Request,
    { params }: { params: Promise<{ id: string }> }
){
    const { id } = await params
    const numId = Number(id)

    await prisma.meeting.delete({
        where: { id: numId }
    })
        return Response.json({success: true})
}