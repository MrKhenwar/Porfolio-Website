import { motion } from 'framer-motion'
import { Target, ExternalLink } from 'lucide-react'

function Projects() {
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

  const projects = [
    {
      id: 1,
      title: "Zyrax Fitness",
      description: "A comprehensive fitness platform connecting women to transform together through community-driven workouts and nutrition guidance.",
      image: "https://i.postimg.cc/cLfDsYqF/prz.png",
      link: "https://www.zyrax.fit",
      tech: ["React", "TypeScript", "CI-CD", "Postgres SQL", "AWS", "SEO"],
      featured: true
    },
    {
      id: 2,
      title: "Zylo Fitness",
      description: "Enhanced fitness ecosystem with advanced features for personal training and community engagement.",
      image: "https://i.postimg.cc/ZnwLSkCM/temp-Imageu5ld-DI.avif",
      link: "https://www.zylo.fit",
      tech: ["React", "TypeScript", "CI-CD", "Postgres SQL", "AWS", "SEO"],
    },
    {
      id: 3,
      title: "HelpIt App",
      description: "Mobile application streamlining daily service bookings with intuitive user interface and seamless booking experience.",
      image: "https://i.postimg.cc/440KrNdT/temp-Images-Mn-E28.avif",
      link: "https://play.google.com/store/apps/details?id=com.katareayush.helpit&pcampaignid=web_share",
      tech: ["React Native", "Firebase", "Redux", "Express"]
    },
    {
      id: 4,
      title: "Consulto Platform",
      description: "Social media platform connecting consultants with clients, featuring Instagram-like interface for professional networking and service discovery. (Soon to be Live)",
      image: "https://i.postimg.cc/t4WhPFmB/temp-Image-TSSffu.avif",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io", "Stream chat", "Imagekit"]
    },
    {
      id: 5,
      title: "Rocket Cars",
      description: "Direct competitor of BlaBla cars (Soon to be Live)",
      image: "https://i.postimg.cc/rw1rzMKb/rc.png",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io", "Websockets"]
    },
  ]

  return (
    <section id="projects" className="py-20 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mixed-font-header text-4xl font-bold mb-4 flex items-center justify-center gap-3 font-poppins">
            <Target className="text-red-500" />
            Featured <span className="serif-accent font-playfair italic">Projects</span>
          </h2>
          <p className="elegant-quote text-lg max-w-2xl mx-auto font-playfair">
            Here are some of my <span className="italic-accent">notable projects</span> that showcase my <span className="emphasis-text underline-accent">skills and passion</span> for development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`card p-6 hover-glow hover-3d ${project.featured ? 'lg:col-span-2' : ''}`}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent" />
              </div>

              <h3 className="text-xl font-bold mb-2 text-white font-poppins hover-italic transition-all duration-300">{project.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed font-poppins">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <motion.a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-semibold font-poppins hover-italic"
                  whileHover={{ x: 5 }}
                >
                  <ExternalLink size={16} />
                  View Project
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects