'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceModal from '@/components/admin/ServiceModal';

interface Category {
    id: number;
    name: string;
}

interface Service {
    id: number;
    category_id: number;
    name: string;
    price: string;
    order_index: number;
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [servicesRes, categoriesRes] = await Promise.all([
                fetch('/api/services'),
                fetch('/api/categories')
            ]);
            const servicesData = await servicesRes.json();
            const categoriesData = await categoriesRes.json();

            setServices(servicesData);
            setCategories(categoriesData);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return;

        try {
            const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const getCategoryName = (id: number) => {
        return categories.find(c => c.id === id)?.name || 'Неизвестная категория';
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Управление услугами</h1>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/categories"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Категории
                        </Link>
                        <button
                            onClick={handleAdd}
                            disabled={categories.length === 0}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium"
                        >
                            Создать услугу
                        </button>
                    </div>
                </div>

                {categories.length === 0 && !loading && (
                    <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700 text-sm">
                        Сначала необходимо создать хотя бы одну{' '}
                        <Link href="/admin/categories" className="font-bold underline hover:text-amber-900">
                            категорию
                        </Link>
                        , чтобы можно было добавлять услуги.
                    </div>
                )}

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Категория</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Наименование</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Цена</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Порядок</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Действия</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">Загрузка...</td>
                                    </tr>
                                ) : services.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500 italic">Список услуг пуст</td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    {getCategoryName(service.category_id)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.order_index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(service)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ServiceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={fetchData}
                    service={editingService}
                    categories={categories}
                />
            </div>
        </div>
    );
}
