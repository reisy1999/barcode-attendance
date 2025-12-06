import { Prisma, PrismaClient } from "@prisma/client";
import Papa from 'papaparse'

const prisma = new PrismaClient()

type StaffRow = {
    staffId: string
    name: string
    department: string
}

//csvインポート
export async function POST(request:Request) {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const text = await file.text()

    const result = Papa.parse<StaffRow>(text, { header: true})

    await prisma.staff.createMany({
        data: result.data
    })

    return Response.json({ count: result.data.length })
}