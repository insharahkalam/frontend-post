import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-ink text-paper pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
                    <div className="lg:col-span-4">
                        <span className="font-display italic text-2xl">Longhand</span>
                        <p className="text-paper/60 mt-4 max-w-xs text-sm leading-relaxed">
                            A slow-read journal for people who still underline things. Published weekly since 2014.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Sections</p>
                        <ul className="space-y-3 text-sm text-paper/70">
                            <li><Link to="/#featured" className="hover:text-marigold transition-colors">Featured</Link></li>
                            <li><Link to="/#categories" className="hover:text-marigold transition-colors">Categories</Link></li>
                            <li><Link to="/#latest" className="hover:text-marigold transition-colors">Latest</Link></li>
                            <li><Link to="/#trending" className="hover:text-marigold transition-colors">Trending</Link></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-2">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Journal</p>
                        <ul className="space-y-3 text-sm text-paper/70">
                            <li><Link to="/my-articles" className="hover:text-marigold transition-colors">My Articles</Link></li>
                            <li><Link to="/all-articles" className="hover:text-marigold transition-colors">All Articles</Link></li>
                            <li><Link to="/create-post" className="hover:text-marigold transition-colors">Write an article</Link></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-4">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/40 mb-4">Stay in the margins</p>
                        <p className="text-sm text-paper/60 mb-4">Get the Sunday edition in your inbox.</p>
                        <Link to="/#newsletter" className="inline-flex items-center gap-2 bg-marigold text-ink font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-paper transition-colors focus-ring">
                            Subscribe now
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-paper/40">
                    <p>© 2026 Longhand Journal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-paper/70">Privacy</a>
                        <a href="#" className="hover:text-paper/70">Terms</a>
                        <a href="#" className="hover:text-paper/70">RSS</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}