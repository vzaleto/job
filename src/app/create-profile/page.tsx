'use client';

import {FormEvent, useEffect, useState} from 'react';
import {useProfile} from '@/context/ProfileContext';
import {useRouter} from 'next/navigation';
import {Profile} from "@/types";
import {useAuth} from "@/context/AuthContext";

export default function CreateProfilePage() {
    const {user, isLoading, fetchUser} = useAuth();
    const {saveProfile} = useProfile();
    const router = useRouter();
    const [formData, setFormData] = useState<Profile>({
        name: '',
        desiredPosition: '',
        city: '',
        about: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveProfile(formData);
        router.push('/jobs');
    };


    useEffect(() => {
        if (isLoading) return; // ждём окончания загрузки
        if (!user) {
            router.push('/login');
        }
    }, [user, isLoading]);

    if (isLoading || !user) return null;

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="teext-2xl font-bold mb-4">Create Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Desired Position</label>
                    <input
                        type="text"
                        value={formData.desiredPosition}
                        onChange={(e) => setFormData({...formData, desiredPosition: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">City</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">About myself</label>
                    <textarea
                        value={formData.about}
                        onChange={(e) => setFormData({...formData, about: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows={4}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Save
                </button>
            </form>
        </div>
    );
}