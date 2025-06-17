'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    console.log('User:', user);
    console.log('Is loading:', isLoading);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [isLoading, user]);

    if (isLoading || !user) return <div>Загрузка...</div>;

    return (
        <div>
            <h1>Добро пожаловать, {user.email}!</h1>
        </div>
    );
}