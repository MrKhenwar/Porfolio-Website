import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone, Brain, Wrench } from 'lucide-react'

function Skills() {
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

  const skillCategories = [
    {
      icon: <Code className="text-red-500" size={32} />,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      icon: <Database className="text-blue-500" size={32} />,
      title: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "Socket.io"]
    },
    {
      icon: <Smartphone className="text-green-500" size={32} />,
      title: "Mobile Development",
      skills: ["React Native", "Expo", "Native APIs", "Redux", "AsyncStorage"]
    },
    {
      icon: <Globe className="text-purple-500" size={32} />,
      title: "Cloud & DevOps",
      skills: ["AWS", "CI/CD", "Docker", "Git", "GitHub Actions", "Vercel"]
    },
    {
      icon: <Brain className="text-yellow-500" size={32} />,
      title: "Data Science",
      skills: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Analysis", "Jupyter"]
    },
    {
      icon: <Wrench className="text-orange-500" size={32} />,
      title: "Tools & Technologies",
      skills: ["VS Code", "Figma", "Postman", "MongoDB Compass", "Chrome DevTools", "Slack"]
    }
  ]

  const techStack = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "React Native", level: 89 },
    { name: "AWS", level: 75 },
    { name: "Python", level: 96 },
    { name: "PostgreSQL", level: 90 }
  ]

  return (
    <section id="skills" className="py-20 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mixed-font-header text-4xl font-bold mb-4 font-poppins">
            Technical <span className="serif-accent font-playfair italic">Skills</span>
          </h2>
          <p className="elegant-quote text-lg max-w-2xl mx-auto font-playfair">
            A <span className="italic-accent">comprehensive overview</span> of my technical <span className="emphasis-text underline-accent">expertise</span> and the technologies I work with.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-6 hover-glow hover-3d"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-xl font-bold text-white font-poppins hover-italic transition-all duration-300">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-red-500/20 hover:text-red-400 transition-colors font-jetbrains"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-center font-poppins">
            Proficiency <span className="serif-accent font-playfair italic">Levels</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <span className="text-white font-medium w-24 text-sm font-jetbrains">{tech.name}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-red-400 font-mono text-sm w-12">{tech.level}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills