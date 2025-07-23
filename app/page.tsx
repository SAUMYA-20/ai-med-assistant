'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Brain,
  Coffee,
  Rocket
} from 'lucide-react'

// Clerk Components
import { UserButton, useUser } from '@clerk/nextjs'

// Particles Background
const Particles = dynamic(() => Promise.resolve(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}), { ssr: false })

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const { isSignedIn } = useUser()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  // Glowing cursor component
  const GlowCursor = () => {
    return (
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="w-5 h-5 bg-purple-500 rounded-full opacity-50 blur-sm" />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-x-hidden">
      <Particles />
      <GlowCursor />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
      </motion.div>

      
      {/* <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-black/30 border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              MedVoSi
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'History', 'Pricing', 'Profile'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:text-purple-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}

              {!isSignedIn ? (
                <>
                  <Link href="/sign-in">
                    <button className="hover:text-purple-400 transition-colors duration-300">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="hover:text-purple-400 transition-colors duration-300">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="ml-6 flex items-center gap-4">
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                MedVoSi
              </span>
              <br />
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Provide 24/7 access to medical services and information.
              <br />
              Book appointments, get prescriptions, and manage your health with ease.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {!isSignedIn ? (
                <>
                  <Link href="/sign-in">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Code2, Zap, Target, Rocket].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + index * 15}%`
              }}
            >
              <Icon className="w-8 h-8 text-purple-400" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Saumya Kharwar. Crafted with passion and code.
          </p>
        </div>
      </footer>
    </div>
  )
}