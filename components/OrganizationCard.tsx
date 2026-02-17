interface OrganizationCardProps {
    name: string;
    desc: string;
    address: string;
    phone: string;
}

export default function OrganizationCard({ name, desc, address, phone }: OrganizationCardProps) {
    return (
        <div className="group">
            <h5 className="mb-2 text-sm font-black text-white transition-colors group-hover:text-blue-400">
                {name}
            </h5>
            <p className="mb-4 text-xs font-medium text-slate-500">{desc}</p>
            <div className="space-y-2 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] opacity-40">📍</span>
                    {address}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] opacity-40">📞</span>
                    {phone}
                </div>
            </div>
        </div>
    );
}
