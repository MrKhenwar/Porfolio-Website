import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp, X } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: "GitHub",
      link: "https://github.com/MrKhenwar",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin size={20} />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/viditrajkhenwar/",
      color: "hover:text-blue-400"
    },
    {
      icon: <X size={20} />,
      name: "X",
      link: "https://x.com/viditkhenwar",
      color: "hover:text-sky-400"
    },
    {
      icon: <Mail size={20} />,
      name: "Email",
      link: "mailto:viditkhenwar@gmail.com",
      color: "hover:text-red-400"
    }
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl font-bold red-gradient-text mb-4 font-jetbrains">&lt;<span className="font-playfair italic">VRK</span>/&gt;</div>
            <p className="text-gray-400 leading-relaxed mb-4 font-poppins">
              <span className="italic-accent">Passionate</span> Computer Science student crafting <span className="emphasis-text underline-accent">innovative digital experiences</span>
              with cutting-edge technologies.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className={`p-2 glass rounded-lg transition-all duration-300 ${social.color}`}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4 font-poppins">Quick <span className="font-playfair italic">Links</span></h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 font-poppins hover-italic"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4 font-poppins"><span className="font-playfair italic">Services</span></h3>
            <ul className="space-y-2 text-gray-400 font-poppins">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>Full Stack Solutions</li>
              <li>UI/UX Design</li>
              <li>Technical Consulting</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4 font-poppins">Get In <span className="font-playfair italic">Touch</span></h3>
            <div className="space-y-2 text-gray-400 text-sm font-poppins">
              <p>Greater Noida, India</p>
              <p>viditkhenwar@gmail.com</p>
              
            </div>
            <motion.a
              href="#contact"
              className="inline-block mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300 font-poppins hover-italic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <span className="font-poppins">© {currentYear} <span className="font-playfair italic">Vidit Raj Khenwar</span>. Made with</span>
              <Heart className="text-red-500" size={16} />
              <span className="font-poppins">and lots of <span className="italic-accent">coffee</span> ☕</span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              className="p-2 glass rounded-lg hover:bg-red-500/20 transition-all duration-300 group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowUp className="text-gray-400 group-hover:text-red-400 transition-colors" size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-800">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-500 text-xs font-poppins"
        >
          Designed and developed with passion. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer