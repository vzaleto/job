import {db} from "@/utils/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

export async function POST(req: Request) {

    const {email, password} = await req.json() // получаем данные из тела запроса

    const [rows]: any = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

    const user = rows[0];

    console.log("user", [rows])

    if (!user) return new Response('User not found', {status: 404})  // если пользователь не найден

    const isValid = await bcrypt.compare(password, user.password_hash); // проверяем пароль

    if (!isValid) return new Response('Invalid password', {status: 401}) // если пароль неверный

    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1d'}) // создаем токен

    return new Response(JSON.stringify({token}), { // возвращаем токен
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })

}

