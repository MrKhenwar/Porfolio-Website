import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

function MoreProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const textOverlayVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      backdropFilter: "blur(0px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      backdropFilter: "blur(8px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3 // Delay for Earth to settle
      }
    }
  }

  const additionalProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/viditraj/ecommerce",
      demo: "https://ecommerce-demo.com"
    },
    {
      id: 2,
      title: "Weather App",
      description: "Real-time weather application with location-based forecasts and interactive maps.",
      tech: ["React", "OpenWeather API", "Mapbox"],
      github: "https://github.com/viditraj/weather-app"
    },
    {
      id: 3,
      title: "Task Management Tool",
      description: "Collaborative project management tool with real-time updates and team features.",
      tech: ["React", "Firebase", "Material-UI"],
      github: "https://github.com/viditraj/task-manager"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills with modern design.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/viditraj/portfolio"
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time messaging app with user authentication and group chat features.",
      tech: ["React", "Socket.io", "Express", "MongoDB"],
      github: "https://github.com/viditraj/chat-app"
    },
    {
      id: 6,
      title: "Blog Platform",
      description: "Content management system for bloggers with rich text editor and SEO optimization.",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      github: "https://github.com/viditraj/blog-platform"
    }
  ]

  return (
    <section id="more-projects" className="py-20 px-6 relative z-30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-40"
        >
          <h2 className="mixed-font-header text-4xl font-bold mb-4 font-poppins">
            More <span className="serif-accent font-playfair italic">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-poppins">
            Additional projects that demonstrate my <span className="italic-accent">versatility</span> and commitment to <span className="emphasis-text underline-accent">continuous learning</span>.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          transition={{
            staggerChildren: 0.1,
            delayChildren: 0.5 // Delay to let Earth settle first
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-40"
        >
          {additionalProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={textOverlayVariants}
              className="card p-6 hover-glow hover-3d backdrop-blur-sm bg-black/30 border border-gray-700/50"
              whileHover={{
                y: -8,
                scale: 1.02,
                backdropFilter: "blur(12px)",
                borderColor: "rgba(239, 68, 68, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  href={project.github}
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                  whileHover={{ x: 2 }}
                >
                  <Github size={14} />
                  Code
                </motion.a>
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
                    whileHover={{ x: 2 }}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MoreProjects