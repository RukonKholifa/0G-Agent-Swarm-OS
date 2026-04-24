import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="lg:ml-60">
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
