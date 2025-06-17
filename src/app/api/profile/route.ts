import { verifyToken } from '@/utils/verifyToken';

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization'); //

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return new Response('Unauthorized: No token provided', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return new Response('Invalid token', { status: 403 });
    }

    return new Response(JSON.stringify({
        message: 'You accessed protected profile route!',
        user: decoded, // содержит id и email из токена
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}



