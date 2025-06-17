'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {apiAuth} from "@/utils/api";
import {useAuth} from "@/context/AuthContext";

export function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const {fetchUser} = useAuth();


    const handleSubmit = async () => {

        const response = await apiAuth.post('/login', {email, password});

        if (response.status === 200) {
            const data = await response.data;
            localStorage.setItem('token', data.token);
            await fetchUser()
            router.push('/jobs');
        } else {
            const text = await response.data;
            setError(`Something went wrong ${text}`);
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center mt-2">
            <h1 className="font-semibold text-2xl mb-1"> Login</h1>
            <div  className="flex flex-col gap-2">
                <div className="mb-2">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
                           className="bg-gray-200 h-10 p-3"/>
                </div>
                <div  className="mb-2">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           placeholder="Password" className="bg-gray-200 h-10 p-3"/>
                </div>
                <div>
                    {/*<button onClick={() => router.push('/register')}>Register</button>*/}
                    <button onClick={() => handleSubmit()} className="bg-amber-500 py-2 px-3 font-semibold cursor-pointer">Login</button>
                </div>
                <div>
                    {error && <p>{error}</p>}
                </div>

            </div>
        </div>
    )
}

