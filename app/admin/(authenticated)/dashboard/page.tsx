'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать!</h1>
        <p className="mt-2 text-gray-600">
          Это административная панель. Выберите раздел в меню для работы с данными.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {user?.role === 'admin' && (
            <>
              <Link
                href="/admin/users"
                className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Управление пользователями
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">Пользователи</dd>
                  <p className="mt-2 text-sm text-gray-500">
                    Создание, редактирование и удаление пользователей
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/categories"
                className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Категории услуг
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">Категории</dd>
                  <p className="mt-2 text-sm text-gray-500">
                    Управление категориями для группировки услуг
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/services"
                className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Список услуг
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">Услуги</dd>
                  <p className="mt-2 text-sm text-gray-500">
                    Управление услугами и ценами
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/announcements"
                className="overflow-hidden rounded-lg bg-white border-2 border-primary/20 shadow-lg shadow-blue-500/5 transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="truncate text-sm font-medium text-primary uppercase tracking-widest">
                    Важное оповещение
                  </dt>
                  <dd className="mt-1 text-3xl font-black text-gray-900 flex items-center gap-2">
                    Объявление 📢
                  </dd>
                  <p className="mt-2 text-sm text-gray-500 italic">
                    Управление текстом и показом объявления на главной странице клиники
                  </p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
