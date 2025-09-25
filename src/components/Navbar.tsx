import { motion } from 'framer-motion'

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 glass backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold red-gradient-text font-jetbrains"
            whileHover={{ scale: 1.05 }}
          >
            &lt;<span className="font-playfair italic">VRK</span>/&gt;
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover-italic text-white transition-colors relative group font-poppins font-medium"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar