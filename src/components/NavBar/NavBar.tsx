'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaHeart, FaHome, FaUser,} from "react-icons/fa";
import {RiLoginBoxFill} from "react-icons/ri";
import {MdOutlineAppRegistration} from "react-icons/md";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import {router} from "next/client";


export const NavBar = () => {

    const {isLoading, user, setUser} = useAuth()
    const pathName = usePathname();
    const [navItems, setNavItems] = useState<NavItem[]>([
        {type: 'link', href: '/jobs', label: 'Jobs', icon: <FaHome/>},
        {type: 'link', href: '/liked', label: 'Liked', icon: <FaHeart/>},
        {type: 'link', href: '/create-profile', label: 'Profile', icon: <FaUser/>},
    ]);

    interface NavItem {
        href?: string
        label: string
        icon: React.ReactNode
        type: string
        onClick?: () => void
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/login');
    }

    useEffect(() => {


        if (!user) {
            setNavItems([
                {type: 'link', href: '/jobs', label: 'Jobs', icon: <FaHome/>},
                {type: 'link', href: '/liked', label: 'Liked', icon: <FaHeart/>},
                {type: 'link', href: '/create-profile', label: 'Profile', icon: <FaUser/>},
                {type: 'link', href: '/login', label: 'Login', icon: <RiLoginBoxFill/>},
                {type: 'link', href: '/register', label: 'Register', icon: <MdOutlineAppRegistration/>},
            ])
        } else {
            setNavItems([
                {type: 'link', href: '/jobs', label: 'Jobs', icon: <FaHome/>},
                {type: 'link', href: '/liked', label: 'Liked', icon: <FaHeart/>},
                {type: 'link', href: '/create-profile', label: 'Profile', icon: <FaUser/>},
                {type: 'action', label: 'Log out', icon: <RiLoginBoxFill/>, onClick: handleLogout},
                {type: 'text', label: ` ${user?.email}`, icon: "Hi"},
            ])
        }
    }, [isLoading, user])

    return (
        <nav className="bg-gray-800 ">
            <ul className=" flex flex-row">
                {navItems.map((item, index) => (
                    <li key={index}>
                        {item.type === 'link' && (
                            <Link href={item.href || '/job/public'}
                                  className={`flex flex-col items-center p-3 md:flex-row md:gap-2 ${pathName === item.href ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-400 transition-colors duration-300`}>
                                <span>{item.icon}</span><span>{item.label}</span>
                            </Link>
                        )}
                        {item.type === 'action' && (
                            <div onClick={item.onClick}
                                 className={`flex flex-col items-center p-3 md:flex-row md:gap-2 cursor-pointer ${pathName === item.href ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-400 transition-colors duration-300`}>
                                <span>{item.icon}</span><span>{item.label}</span>
                            </div>
                        )}
                        {item.type === 'text' && (
                            <div
                                className={`flex flex-col items-center p-3 md:flex-row md:gap-2 ${pathName === item.href ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-400 transition-colors duration-300`}>
                                <span>{item.icon}</span><span>{item.label}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};