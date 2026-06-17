import { useState } from "react";
import emailjs from "@emailjs/browser";

const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 " +
    "focus:outline-none focus:border-indigo-400/60 focus:bg-white/8 transition";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | null>(null);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        setStatus(null);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                e.currentTarget,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus("success");
            form.reset();
        } catch (err) {
            console.error("EmailJS error:", err);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={sendEmail} className="space-y-4">
            <input
                name="name"
                placeholder="Name"
                className={inputClass}
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                className={inputClass}
                required
            />

            <textarea
                name="message"
                placeholder="Message"
                rows={5}
                className={`${inputClass} resize-none`}
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-500 text-white font-medium
                           hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
                <p className="text-sm text-emerald-400 text-center">
                    Message sent! I'll get back to you soon.
                </p>
            )}
            {status === "error" && (
                <p className="text-sm text-red-400 text-center">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}
