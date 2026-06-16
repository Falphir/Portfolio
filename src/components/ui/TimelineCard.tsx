type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

export type TimelineItem = {
    title: string;
    subtitle: string;
    startDate: string;
    endDate?: string;
    description?: string[];
    technologies?: Technology[];
};

type TimelineCardProps = {
    item: TimelineItem;
    align?: "left" | "right";
};

const formatMonthYear = (isoDate: string) => {
    if (!isoDate) return "";

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(date);
};

const formatRange = (start: string, end?: string): string => {
    const startFormatted = formatMonthYear(start);
    const endFormatted = end ? formatMonthYear(end) : "Present";

    return `${startFormatted} - ${endFormatted}`;
};

export default function TimelineCard({ item, align = "left" }: TimelineCardProps) {
    const isRight = align === "right";

    return (
        <div
            className={`p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 ${
                isRight ? "text-right" : "text-left"
            }`}
        >
            <div className="mb-2 md:mb-3">
                <span className="text-lg md:text-2xl font-semibold text-indigo-300 whitespace-nowrap">
                    {formatRange(item.startDate, item.endDate)}
                </span>
            </div>

            <h3 className="text-white font-semibold text-lg">
                {item.title}
            </h3>

            {item.subtitle && (
                <p className="text-gray-300 text-sm">
                    {item.subtitle}
                </p>
            )}

            {item.description && (
                <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    {item.description.map((d, i) => (
                        <li
                            key={i}
                            className={`flex items-start gap-2 ${
                                isRight ? "justify-end" : ""
                            }`}
                        >
                            {!isRight && (
                                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-indigo-400 shrink-0" />
                            )}

                            <span>{d}</span>

                            {isRight && (
                                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-indigo-400 shrink-0" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}