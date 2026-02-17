import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen selection:bg-primary/20">
            {/* Decorative Background Blobs */}
            <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
                <div className="bg-blob -top-24 -left-24 animate-pulse"></div>
                <div className="bg-blob top-1/2 -right-48 delay-1000"></div>
                <div className="bg-blob -bottom-24 left-1/3 delay-500"></div>
            </div>

            <Header />
            <main className="pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
