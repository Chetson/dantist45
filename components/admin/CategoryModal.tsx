'use client';

import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Category {
    id: number;
    name: string;
    order_index: number;
}

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    category?: Category | null;
}

export default function CategoryModal({ isOpen, onClose, onSubmit, category }: CategoryModalProps) {
    const [formData, setFormData] = useState({ name: '', order_index: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({ name: category.name, order_index: category.order_index });
        } else {
            setFormData({ name: '', order_index: 0 });
        }
    }, [category, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = category ? 'PUT' : 'POST';
        const url = category ? `/api/categories/${category.id}` : '/api/categories';

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
            console.error('Failed to save category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category ? 'Редактировать категорию' : 'Добавить новую категорию'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Порядок отображения</label>
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
                        {loading ? 'Загрузка...' : category ? 'Сохранить' : 'Создать'}
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
