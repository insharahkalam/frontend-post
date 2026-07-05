import { useRef, useState } from "react"

export default function Newsletter() {
    const emailRef = useRef(null)
    const [subscribed, setSubscribed] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (emailRef.current?.value) {
            setSubscribed(true)
            emailRef.current.value = ""
        }
    }

    return (
        <section id="newsletter" className="bg-marigold text-ink py-24 lg:py-28">
            <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center reveal">
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4">The Weekly Marginalia</p>
                <h2 className="font-display font-medium text-4xl lg:text-5xl leading-tight mb-5">
                    One email, every Sunday. No filler.
                </h2>
                <p className="text-ink/70 max-w-xl mx-auto mb-10">
                    Five stories worth your coffee, curated by our editors and delivered before the week gets loud.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
                    <label htmlFor="newsletterEmail" className="sr-only">Email address</label>
                    <input
                        id="newsletterEmail"
                        ref={emailRef}
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="flex-1 px-5 py-3.5 rounded-full border-2 border-ink/20 bg-paper focus:border-ink outline-none transition-colors focus-ring"
                    />
                    <button
                        type="submit"
                        className={`font-semibold px-6 py-3.5 rounded-full transition-colors focus-ring ${subscribed ? "bg-ink text-paper" : "bg-ink text-paper hover:bg-inksoft"
                            }`}
                    >
                        {subscribed ? "Subscribed ✓" : "Subscribe"}
                    </button>
                </form>

                <p className="text-xs text-ink/50 mt-4">No spam. Unsubscribe with one click, any time.</p>
            </div>
        </section>
    )
}