'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function AdminAnnouncementsPage() {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (res.ok) {
                    setActive(data.announcement_active === 'true');
                    setContent(data.announcement_html || '');
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    announcement_active: active.toString(),
                    announcement_html: content,
                }),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Настройки успешно сохранены' });
            } else {
                setMessage({ type: 'error', text: 'Ошибка при сохранении настроек' });
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            setMessage({ type: 'error', text: 'Ошибка сети' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-foreground">Управление объявлением</h1>
                <p className="text-slate-500">Настройте текст важного уведомления для главной страницы</p>
            </div>

            <div className="space-y-6 rounded-[2.5rem] bg-white p-10 shadow-xl shadow-blue-900/5 border border-slate-100">
                <div className="flex items-center justify-between py-4 border-b border-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Показывать объявление</h3>
                        <p className="text-sm text-slate-400">Включите этот тумблер, чтобы объявление появилось на главной странице</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                            className="peer sr-only"
                        />
                        <div className="peer h-8 w-14 rounded-full bg-slate-200 after:absolute after:top-1 after:left-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-6"></div>
                    </label>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Текст объявления</h3>
                    <div className="h-[300px] mb-12">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="h-[250px]"
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ color: [] }, { background: [] }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['clean'],
                                ],
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    {message.text && (
                        <div className={`text-sm font-bold ${message.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {message.text}
                        </div>
                    )}
                    <div className="flex-grow"></div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-2xl bg-primary px-10 py-4 text-xl font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                </div>
            </div>

            <div className="mt-8 rounded-3xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="flex items-center space-x-2 text-primary font-black mb-2">
                    <span>💡</span>
                    <span>Совет</span>
                </h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                    Объявление будет отображаться на главной странице сразу после первого блока (Hero). Используйте яркие цвета и жирный шрифт для привлечения внимания к важным изменениям в графике работы.
                </p>
            </div>
        </div>
    );
}
