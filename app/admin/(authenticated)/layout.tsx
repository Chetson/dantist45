import AdminHeader from '@/components/AdminHeader';

export default function AdminAuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 uppercase-links">
            <AdminHeader />
            <main className="py-6">
                {children}
            </main>
        </div>
    );
}
