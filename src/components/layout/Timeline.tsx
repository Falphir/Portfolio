import { useEffect, useRef, useState } from "react";
import TimelineCard, { type TimelineItem } from "../ui/TimelineCard";

type Props = {
    items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
    const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        rowRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    setVisibleRows((prev) => {
                        const next = new Set(prev);
                        if (entry.isIntersecting) next.add(i);
                        else next.delete(i);
                        return next;
                    });
                },
                { threshold: 0.15 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [items]);

    return (
        <div className="relative max-w-5xl mx-auto">

            {/* Timeline line */}
            <div
                className="
                    absolute left-4 md:left-1/2
                    top-0 h-full w-[2px]
                    md:-translate-x-1/2
                    bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-transparent
                "
            />

            <div className="space-y-10 md:space-y-16">
                {items.map((item, index) => {
                    const isLeft = index % 2 === 0;
                    const visible = visibleRows.has(index);

                    return (
                        <div
                            key={index}
                            ref={(el) => { rowRefs.current[index] = el; }}
                            className="relative flex md:items-center w-full"
                        >
                            {/* Dot */}
                            <div
                                className={`
                                    absolute left-4 md:left-1/2
                                    top-12 md:top-auto
                                    w-4 h-4 rounded-full
                                    bg-indigo-500
                                    shadow-[0_0_18px_rgba(99,102,241,0.9)]
                                    z-10
                                    -translate-x-1/2
                                    md:-translate-x-1/2
                                    transition-all duration-500 delay-200
                                    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                                `}
                            />

                            {/* MOBILE */}
                            <div
                                className={`w-full md:hidden py-2 pl-14 transition-all duration-500
                                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            >
                                <TimelineCard item={item} />
                            </div>

                            {/* DESKTOP LEFT */}
                            <div
                                className={`hidden md:flex w-1/2 pr-10 justify-end transition-all duration-500
                                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                            >
                                {isLeft && <TimelineCard item={item} align="right" />}
                            </div>

                            {/* DESKTOP RIGHT */}
                            <div
                                className={`hidden md:flex w-1/2 pl-10 justify-start transition-all duration-500
                                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                            >
                                {!isLeft && <TimelineCard item={item} align="left" />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
