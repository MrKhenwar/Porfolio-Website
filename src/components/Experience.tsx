import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const experiences = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Zyrax Fitness",
      location: "Remote",
      period: "2024 - Present",
      description: "Leading development of comprehensive fitness platform connecting women through community-driven workouts. Implementing React, TypeScript, and AWS infrastructure.",
      achievements: [
        "Built scalable web application serving 1000+ users",
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Optimized database queries improving performance by 40%",
        "Integrated payment systems and user authentication"
      ],
      technologies: ["React", "TypeScript", "AWS", "PostgreSQL", "CI/CD"]
    },
    {
      id: 2,
      title: "Mobile App Developer",
      company: "HelpIt Services",
      location: "Hybrid",
      period: "2024",
      description: "Developed mobile application for daily service bookings with intuitive user interface and seamless booking experience.",
      achievements: [
        "Published app on Google Play Store with 4.5+ rating",
        "Implemented real-time notifications and booking system",
        "Created admin dashboard for service management",
        "Integrated payment gateway and user reviews system"
      ],
      technologies: ["React Native", "Firebase", "Redux", "Express"]
    },
    {
      id: 3,
      title: "Software Engineering Intern",
      company: "Tech Startup",
      location: "Bangalore, India",
      period: "2023",
      description: "Contributed to various web development projects and learned industry best practices for software development.",
      achievements: [
        "Collaborated with senior developers on React applications",
        "Participated in code reviews and agile development process",
        "Implemented responsive designs and API integrations",
        "Gained experience with modern development tools and workflows"
      ],
      technologies: ["React", "JavaScript", "Node.js", "MongoDB"]
    }
  ]

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Bennett University",
      location: "Greater Noida, India",
      period: "2024 - 2028",
      description: "Pursuing comprehensive computer science education with focus on software engineering, data structures, and modern development practices.",
      
    }
  ]

  return (
    <section id="experience" className="py-20 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Briefcase className="text-red-500" />
            Professional <span className="red-gradient-text">Experience</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            My journey in software development and the impactful projects I've contributed to.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-8 mb-16"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="card p-8 hover-glow relative"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <h4 className="text-xl text-red-400 font-semibold mb-3">{exp.company}</h4>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <MapPin size={16} />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <h5 className="text-white font-semibold mb-2">Key Achievements:</h5>
                    {exp.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-red-500 mt-1">•</span>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              {index < experiences.length - 1 && (
                <div className="absolute bottom-0 left-8 w-0.5 h-8 bg-gradient-to-b from-red-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="red-gradient-text">Education</span>
          </h3>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
              <h5 className="text-lg text-red-400 font-semibold mb-2">{edu.institution}</h5>
              <div className="flex justify-center items-center gap-4 text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span className="text-sm">{edu.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span className="text-sm">{edu.location}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-2">{edu.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience