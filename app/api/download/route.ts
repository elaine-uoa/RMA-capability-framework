import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'RMAF_V1.5_for_socialisation.docx');
    const fileBuffer = await readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="RMA_Capability_Framework_v1.5.docx"',
      },
    });
  } catch (error) {
    console.error('Error downloading framework:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
