'use client';
import {useState} from "react";
import {apiAuth} from "@/utils/api";

export function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async () => {

        try{

            const response = await apiAuth.post('/register', {username, email, password})

            if (response.status === 201) {
                setMessage('User registered successfully RegisterForm');
                console.log(response)
            }

        }catch(error:any){
             console.log(error)
            console.log(error.response.data)
          if(error.response?.status === 409){
              setMessage(`User already exist`)
          }
            else{
                setMessage('Registration failed')
          }
        }

    }

    return (
        <div className="flex flex-col gap-4 items-center mt-2">
            <h1 className=" font-semibold text-2xl mb-1">Register</h1>
            <div className="flex flex-col gap-2">
                <div>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"
                           placeholder="Username"
                           className="bg-gray-200 h-10 p-3"/>
                </div>
                <div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
                           className="bg-gray-200 h-10 p-3"/>
                </div>
                <div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           placeholder="Password" className="bg-gray-200 h-10 p-3"/>
                </div>

                <div>
                    <button type="button" onClick={() => handleSubmit()}
                            className="h-10 bg-amber-500 px-3 py-2 font-semibold cursor-pointer">Register
                    </button>
                </div>

            </div>
            {message && <p>{message}</p>}
        </div>
    )
}