// app/layout.jsx
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col overflow-x-hidden">

        {/* Navbar */}
        <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner py-4 px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
