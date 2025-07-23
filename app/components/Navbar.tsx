'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'History', href: '/history' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-black/30 border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* 🔹 Logo */}
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              MedVoSi
            </motion.div>
          </div>

          {/* 🔹 Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href} className="hover:text-purple-400 transition-colors duration-300 relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            {!isSignedIn ? (
              <>
                <Link href="/sign-in" className="hover:text-purple-400 transition-colors duration-300">
                  Sign In
                </Link>
                <Link href="/sign-up" className="hover:text-purple-400 transition-colors duration-300">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="ml-6">
                <UserButton afterSwitchSessionUrl="/" />
              </div>
            )}
          </div>

          {/* 🔹 Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-purple-400">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden flex flex-col gap-4 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {!isSignedIn ? (
              <>
                <Link href="/sign-in" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link href="/sign-up" className="hover:text-purple-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex justify-center">
                <UserButton afterSwitchSessionUrl="/" />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
