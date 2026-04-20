type BadgeProps = {
    children: React.ReactNode;
    category?: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

export default function Badge({ children, category = "tool" }: BadgeProps) {

    const categoryColors = {
        language: "bg-indigo-500/10 text-indigo-300 border-indigo-400/20",
        frontend: "bg-blue-500/10 text-blue-300 border-blue-400/20",
        backend: "bg-green-500/10 text-green-300 border-green-400/20",
        mobile: "bg-purple-500/10 text-purple-300 border-purple-400/20",
        database: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
        tool: "bg-white/10 text-gray-300 border-white/10",
    };

    return (
        <span
            className={`px-3 py-1 text-xs rounded-full border transition ${categoryColors[category]}`}
        >
            {children}
        </span>
    );
}