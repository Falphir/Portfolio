import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type ImageGalleryProps = {
    images: string[];
    altPrefix?: string;
};

function Lightbox({
    images,
    index,
    onClose,
    onNav,
}: {
    images: string[];
    index: number;
    onClose: () => void;
    onNav: (next: number) => void;
}) {
    const hasPrev = index > 0;
    const hasNext = index < images.length - 1;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && hasPrev) onNav(index - 1);
            if (e.key === "ArrowRight" && hasNext) onNav(index + 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [index, hasPrev, hasNext, onClose, onNav]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close */}
            <button
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
                onClick={onClose}
                aria-label="Close"
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/50 tabular-nums">
                {index + 1} / {images.length}
            </span>

            {/* Prev */}
            {hasPrev && (
                <button
                    className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    onClick={(e) => { e.stopPropagation(); onNav(index - 1); }}
                    aria-label="Previous image"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}

            {/* Image */}
            <img
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {hasNext && (
                <button
                    className="absolute right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    onClick={(e) => { e.stopPropagation(); onNav(index + 1); }}
                    aria-label="Next image"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); onNav(i); }}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                                i === index ? "bg-white w-4" : "bg-white/30 hover:bg-white/60"
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ImageGallery({ images, altPrefix = "Screenshot" }: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (images.length === 0) return null;

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="group relative rounded-xl overflow-hidden aspect-video bg-white/5 hover:ring-2 hover:ring-indigo-400/40 transition"
                        aria-label={`${altPrefix} ${i + 1}`}
                    >
                        <img
                            src={img}
                            alt={`${altPrefix} ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </button>
                ))}
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    index={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNav={setLightboxIndex}
                />
            )}
        </>
    );
}
