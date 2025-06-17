import { db } from '@/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
        return new Response('Missing fields', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        const [existingUser]: any = await db.query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )
        if(existingUser > 0) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
        }


        const [result]: any = await db.query(
            `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );

        if (result.affectedRows !== 1) {
            return new Response('Registration failed', { status: 500 });
        }
        console.log('REGISTERING:', username, email);
        return new Response(JSON.stringify({
            message: 'User registered successfully route',
            userId: result.insertId,
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error:any) {
        console.error('Registration DB error:', error);

        if(error.code === 'ER_DUP_ENTRY') {
            return new Response(JSON.stringify({message: error.sqlMessage}), {
                status: 409,
                headers: {'Content-Type': 'application/json'}
            });
        }

        return new Response('Database Error', { status: 500 });
    }
}
