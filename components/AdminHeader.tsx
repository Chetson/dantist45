'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    role: string;
}

export default function AdminHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const navLinks = [
        { href: '/admin/dashboard', label: 'Главная' },
        { href: '/admin/users', label: 'Пользователи', adminOnly: true },
        { href: '/admin/categories', label: 'Категории услуг' },
        { href: '/admin/services', label: 'Услуги' },
        { href: '/admin/announcements', label: 'Уведомление' },
    ];

    return (
        <nav className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center px-4 font-bold text-gray-900"
                        >
                            Админ-панель
                        </Link>
                        <div className="ml-10 flex items-center space-x-4">
                            {navLinks.map((link) => {
                                if (link.adminOnly && user?.role !== 'admin') return null;
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-md transition-colors ${isActive
                                            ? 'bg-blue-50 text-primary font-bold'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <span className="text-sm text-gray-500 font-medium">
                                {user.fullName} ({user.role})
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
