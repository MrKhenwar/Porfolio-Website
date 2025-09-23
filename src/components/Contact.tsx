import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, X, Download } from 'lucide-react'
import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create email body with form data
    const emailBody = `Hi Vidit,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`

    // Create mailto link
    const mailtoLink = `mailto:viditkhenwar@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(emailBody)}`

    // Open email client
    window.location.href = mailtoLink

    // Clear form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleDownloadResume = () => {
    // You'll need to place your resume file in the public folder
    const resumeUrl = '/resume/Vidit_Raj_Khenwar_Resume.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Vidit_Raj_Khenwar_Resume.pdf'
    link.click()
  }

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

  const contactInfo = [
    {
      icon: <Mail className="text-red-500" size={24} />,
      title: "Email",
      value: "viditkhenwar@gmail.com",
      link: "mailto:viditkhenwar@gmail.com"
    },
    
    {
      icon: <MapPin className="text-blue-500" size={24} />,
      title: "Location",
      value: "Greater Noida, India",
      link: "#"
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: "GitHub",
      link: "https://github.com/MrKhenwar",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/viditrajkhenwar/",
      color: "hover:text-blue-400"
    },
    {
      icon: <X size={24} />,
      name: "Twitter",
      link: "https://x.com/viditkhenwar",
      color: "hover:text-sky-400"
    }
  ]

  return (
    <section id="contact" className="py-20 px-6 relative z-20">
      <div className="container mx-auto max-w-6xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Mail className="text-red-500" />
            Get In <span className="red-gradient-text">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to work together? I'd love to hear about your project and discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-white">Let's Connect</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hello,
              I'm always excited to connect with fellow developers and potential clients.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 glass rounded-lg hover-glow hover-3d transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  {info.icon}
                  <div>
                    <div className="text-white font-semibold">{info.title}</div>
                    <div className="text-gray-300 group-hover:text-white transition-colors">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className={`p-3 glass rounded-lg transition-all duration-300 ${social.color}`}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-white">Send Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white transition-colors"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white transition-colors"
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none text-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleDownloadResume}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors border border-gray-600 hover:border-gray-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={20} />
                  Download Resume
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact