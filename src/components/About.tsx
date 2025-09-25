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
            <h2 className="mixed-font-header text-4xl font-bold mb-6 flex items-center gap-3 font-poppins">
              <Terminal className="text-red-500" />
              About <span className="serif-accent font-playfair italic">Me</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-poppins">
              I'm a <span className="italic-accent">dynamic</span> Computer Science student at Bennett University with a passion for
              creating <span className="emphasis-text underline-accent">innovative digital solutions</span>. My journey spans across <span className="code-style">web development</span>,
              <span className="code-style">data science</span>, and <span className="code-style">backend technologies</span>.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-500 font-poppins">10+</div>
                <div className="text-sm text-gray-400 font-poppins italic">Projects Completed</div>
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