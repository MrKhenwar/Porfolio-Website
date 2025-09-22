import { motion } from 'framer-motion'
import { Terminal, Download } from 'lucide-react'

function About() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="about" className="py-20 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-red-500" />
              About <span className="red-gradient-text">Me</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a dynamic Computer Science student at Bennett University with a passion for
              creating innovative digital solutions. My journey spans across web development,
              data science, and backend technologies.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-500">10+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
            </div>
            <motion.button
              className="btn-secondary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Placeholder for image/content */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About