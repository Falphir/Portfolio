import { useEffect, useRef } from "react";

export default function Background() {
    const glowRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            const speed = 0.10; // 👈 lower = more delay, higher = faster

            pos.current.x += (mouse.current.x - pos.current.x) * speed;
            pos.current.y += (mouse.current.y - pos.current.y) * speed;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base gradient (richer + less flat) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_40%),linear-gradient(135deg,#020617,#0f172a,#020617)]" />

            {/* Smooth glow */}
            <div
                ref={glowRef}
                className="absolute w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            circle at center,
                            rgba(99,102,241,0.35),
                            rgba(59,130,246,0.25),
                            rgba(168,85,247,0.15),
                            transparent 70%
                        )
                    `,
                    filter: "blur(40px)",
                    transform: "translate(-50%, -50%)",
                    mixBlendMode: "screen",
                }}
            />
        </div>
    );
}