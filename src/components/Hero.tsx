import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail } from 'lucide-react'
import RotatingEarth from './RotatingEarth'
import { useScrollSection } from '../hooks/useScrollSection'

function Hero() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Software Developer'
  const currentSection = useScrollSection()
  const [nameClickCount, setNameClickCount] = useState(0)

  const handleNameClick = () => {
    const newCount = nameClickCount + 1
    setNameClickCount(newCount)
    console.log(`Name clicked! Count: ${newCount}`)

    // Reset name click count after 3 seconds if not reaching 3 clicks
    if (newCount < 3) {
      setTimeout(() => {
        setNameClickCount(0)
      }, 3000)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typedText.length < fullText.length) {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [typedText, fullText])

  return (
    <>
      {/* Global Rotating Earth Background */}
      <RotatingEarth currentSection={currentSection} nameClickCount={nameClickCount} />

      <section id="hero" className="min-h-screen flex items-center justify-center text-center px-6 pt-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-red-500 text-lg font-mono">&gt; Hello World, I'm</span>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-black mb-6 gradient-text cursor-pointer hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            onClick={handleNameClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            VIDIT RAJ
            <br />
            <span className="neon-text">KHENWAR</span>
          </motion.h1>

          <motion.div
            className="text-2xl md:text-3xl mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-white">{typedText}</span>
            <span className="animate-pulse text-red-500">|</span>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Passionate Computer Science student crafting innovative digital experiences
            with cutting-edge technologies and modern design principles.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={20} />
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero