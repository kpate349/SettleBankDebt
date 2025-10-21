import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SettleBankDebt - Modern Debt Relief Solutions",
  description: "Get free debt evaluation, compare relief options, and track your settlement progress with our AI-powered platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  SettleBankDebt
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/evaluation" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Debt Evaluation
                </Link>
                <Link href="/simulator" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Debt Simulator
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Success Stories
                </Link>
                <Link href="/advisor" className="text-gray-700 hover:text-blue-600 transition-colors">
                  AI Advisor
                </Link>
                <Link href="/tracker" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Progress Tracker
                </Link>
                <Link href="/qualification" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">SettleBankDebt</h3>
                <p className="text-gray-400">
                  Modern debt relief solutions powered by AI and expert negotiation.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/evaluation" className="hover:text-white">Debt Evaluation</Link></li>
                  <li><Link href="/simulator" className="hover:text-white">Debt Simulator</Link></li>
                  <li><Link href="/advisor" className="hover:text-white">AI Advisor</Link></li>
                  <li><Link href="/qualification" className="hover:text-white">Pre-Qualification</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/dashboard" className="hover:text-white">Success Stories</Link></li>
                  <li><Link href="/tracker" className="hover:text-white">Progress Tracker</Link></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@settlebankdebt.com</li>
                  <li>1-800-DEBT-HELP</li>
                  <li>Mon-Fri 9AM-6PM EST</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SettleBankDebt. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
