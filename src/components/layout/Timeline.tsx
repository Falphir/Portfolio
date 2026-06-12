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

type Technology = {
    name: string;
    category: "language" | "frontend" | "backend" | "mobile" | "database" | "tool";
};

type TimelineItem = {
    title: string;
    subtitle: string;
    startDate: string;
    endDate?: string;
    description?: string[];
    technologies?: Technology[];
};

type Props = {
    items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
    return (
        <div className="relative max-w-5xl mx-auto">

            {/* center line */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2
                      bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-transparent" />

            <div className="space-y-16">
                {items.map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={index} className="relative flex items-center w-full">

                            {/* dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                              bg-indigo-500 shadow-[0_0_18px_rgba(99,102,241,0.9)] z-10" />

                            {/* LEFT */}
                            <div className="w-1/2 pr-10 flex justify-end">
                                {isLeft && (
                                    <div className="w-[90%] p-6 rounded-xl bg-white/5 backdrop-blur-xl
                                  border border-white/10 hover:border-indigo-400/40
                                  transition group relative text-right">

                                        {/* DATE */}
                                        <div className="mb-3">
                      <span className="text-2xl font-semibold text-indigo-300 tracking-wide">
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
                                                    <li key={i} className="grid grid-cols-[1fr_auto] gap-3 items-center">
                                                        {/* text */}
                                                        <span className="leading-relaxed">
                                                          {d}
                                                        </span>

                                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT */}
                            <div className="w-1/2 pl-10 flex justify-start">
                                {!isLeft && (
                                    <div className="w-[90%] p-6 rounded-xl bg-white/5 backdrop-blur-xl
                                  border border-white/10 hover:border-indigo-400/40
                                  transition group relative text-left">

                                        {/* DATE */}
                                        <div className="mb-3">
                                          <span className="text-2xl font-semibold text-indigo-300 tracking-wide">
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
                                                    <li key={i} className="grid grid-cols-[auto_1fr] gap-3 items-center">

                                                        {/* bullet (centered) */}
                                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />

                                                        {/* text */}
                                                        <span className="leading-relaxed">
                                                          {d}
                                                        </span>

                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}