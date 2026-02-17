'use client';

import { useState, useEffect } from 'react';
import Modal from '../Modal';

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

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    service?: Service | null;
    categories: Category[];
}

export default function ServiceModal({ isOpen, onClose, onSubmit, service, categories }: ServiceModalProps) {
    const [formData, setFormData] = useState({
        category_id: 0,
        name: '',
        price: '',
        order_index: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (service) {
            setFormData({
                category_id: service.category_id,
                name: service.name,
                price: service.price,
                order_index: service.order_index
            });
        } else {
            setFormData({
                category_id: categories.length > 0 ? categories[0].id : 0,
                name: '',
                price: '',
                order_index: 0
            });
        }
    }, [service, categories, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = service ? 'PUT' : 'POST';
        const url = service ? `/api/services/${service.id}` : '/api/services';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onSubmit();
                onClose();
            }
        } catch (error) {
            console.error('Failed to save service:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={service ? 'Редактировать услугу' : 'Добавить новую услугу'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                    <select
                        required
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none bg-white transition-all"
                    >
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Наименование</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Стоимость</label>
                    <input
                        type="text"
                        required
                        placeholder="Например: 500 или от 1000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
                    <input
                        type="number"
                        value={formData.order_index}
                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                </div>
                <div className="flex space-x-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all font-medium"
                    >
                        {loading ? 'Загрузка...' : service ? 'Сохранить' : 'Создать'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition-colors font-medium"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    );
}
