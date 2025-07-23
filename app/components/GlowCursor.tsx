// components/GlowCursor.tsx
'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const GlowCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
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