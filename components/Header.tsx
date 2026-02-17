'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoHeader } from '@/components/LogoHeader';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'О клинике', href: '/#about' },
  { name: 'Услуги', href: '/services' },
  { name: 'Отзывы', href: '/#testimonials' },
  { name: 'Контакты', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'header-glass py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex cursor-pointer items-center transition-transform hover:scale-[1.02]">
          <LogoHeader className="h-9 w-auto md:h-11" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#appointment"
            className="ml-4 rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-95"
          >
            Записаться
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-foreground/80 hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="mx-4 mb-4 mt-2 divide-y divide-border rounded-2xl border border-border bg-card p-2 shadow-2xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-xl px-4 py-4 text-base font-semibold text-foreground/90 transition-colors hover:bg-muted hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="p-4">
            <Link
              href="/#appointment"
              className="block w-full rounded-xl bg-primary py-4 text-center text-base font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Записаться
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

