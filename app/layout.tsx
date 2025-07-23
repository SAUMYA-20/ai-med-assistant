import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {
  ClerkProvider,
} from '@clerk/nextjs';

import { GlowCursor } from './components/GlowCursor';
import Provider from './provider';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedVoSi - AI Medical Voice Assistant',
  description:
    'Medical Assistant powered by AI for voice-based medical queries and information retrieval',
  keywords: [
    'MedVoSi',
    'AI-powered Voice Medical Assistant',
    'TypeScript',
    'Voice Assistant',
    'Medical Queries',
    'Healthcare Technology',
  ],
  authors: [{ name: 'Saumya Kharwar' }],
  openGraph: {
    title: 'MedVoSi - AI Medical Voice Assistant',
    description:
      'Medical Assistant powered by AI for voice-based medical queries and information retrieval',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white`}
        >
          <GlowCursor />
          <Navbar/>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
