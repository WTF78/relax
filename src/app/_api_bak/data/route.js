import { promises as fs } from 'fs';
import path from 'path';


const dateFilePath = path.join(process.cwd(), 'data', 'data.json');

export async function GET() {
    try {
        const data_ = await fs.readFile(dateFilePath, 'utf8');
        const parsed = JSON.parse(data_);
        return new Response(JSON.stringify({ data: parsed }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to read date' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { date } = body;

        if (!date) {
            return new Response(JSON.stringify({ message: 'Date is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await fs.writeFile(dateFilePath, JSON.stringify({ date }), 'utf8');

        return new Response(JSON.stringify({ message: 'Date saved' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to save date' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
