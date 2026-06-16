import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const sendEmail = async (e: React.SubmitEvent) => {
            e.preventDefault();
            setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                e.target,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus("Message sent successfully!");
            e.target.reset();
        } catch (err: unknown) {
            let message = "Unknown error";

            if (err instanceof Error) {
                message = err.message;
            }

            setStatus("Failed to send message. " + message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={sendEmail} className="space-y-4 max-w-md">
            <input
                name="name"
                placeholder="Name"
                className="w-full p-2 rounded bg-white/5 text-white"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white/5 text-white"
                required
            />

            <textarea
                name="message"
                placeholder="Message"
                className="w-full p-2 rounded bg-white/5 text-white"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-500 px-4 py-2 rounded text-white"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>

            {status && <p className="text-sm text-gray-400">{status}</p>}
        </form>
    );
}