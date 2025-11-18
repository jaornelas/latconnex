import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* NAVBAR */}
            <nav className="bg-white border-b shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-red-600 tracking-tight">
                        LatConnex
                    </Link>

                    {/* Navigation Links */}
                    <div className="space-x-6 text-lg">
                        <Link to="/" className="hover:text-red-600 transition">Home</Link>
                        <Link to="/add" className="hover:text-red-600 transition">Add Business</Link>
                    </div>
                </div>
            </nav>

            {/* Spacing so content isn't behind navbar */}
            <div className="h-20"></div>

            <main className="max-w-6xl mx-auto px-6 pb-16">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="text-center text-gray-500 py-6 mt-12 text-sm">
                Built with ❤️ for the Latino community - LatConnex @ {new Date().getFullYear()}
            </footer>
        </div>
    )
}