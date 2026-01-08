import { NextRequest, NextResponse } from "next/server";
import db from "@/src/db/db";
import { notFound } from "next/navigation";
import fs from "fs/promises";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    // Unwrap params properly in Next.js 13+
    const params = await context.params; // <-- await here
    const { id } = params;

    if (!id) return new Response("Missing id", { status: 400 });

    const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true },
    });

    if (product == null) return notFound();

    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split(".").pop();

    return new NextResponse(file, {
        headers: {
            "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
            "Content-Length": size.toString(),
        },
    });
}
