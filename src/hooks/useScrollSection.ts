import { useState, useEffect } from 'react'

export function useScrollSection() {
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'hero'
            setCurrentSection(sectionId)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  return currentSection
}