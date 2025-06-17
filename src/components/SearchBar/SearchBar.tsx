'use client';
import {FiSearch} from "react-icons/fi";
import {useRouter} from "next/navigation";
import React, {FormEvent, useEffect, useState} from "react";

interface SearchBarProps {
    initialValue?: string;
    onSearch?: (value: string) => void;
}

export const SearchBar = ({initialValue = '', onSearch}: SearchBarProps) => {

    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    console.log('initialValue', initialValue)
    console.log('searchValue', searchValue)

    useEffect(() => {
        setSearchValue(initialValue);
    }, [initialValue]);

    const handleSearch = (e:FormEvent) => {
        e.preventDefault();
        const trimmedValue = searchValue.trim();

        if(!trimmedValue) return;

        if (onSearch) {
            onSearch(trimmedValue);
        } else {
            router.push(`/jobs?query=${encodeURIComponent(trimmedValue)}`)
        }
    }
    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-md">
            <div className="relative flex-grow">
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  placeholder="Find a job..." className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button
                type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700" aria-label="Search">
                <FiSearch size={20} />
            </button>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                Finder
            </button>
        </form>
    )
}