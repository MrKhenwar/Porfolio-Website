import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Code, Database, Languages, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css'; // Add custom styles


function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; dx: number; dy: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(17, 24, 39, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#60A5FA';
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-poppins">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="py-20 text-center">
          <motion.h1
            className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4 }}
          >
            VIDIT RAJ KHENWAR
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Dynamic professional with a Bachelor of Technology in Computer Science. Passionate about development and technology with a focus on delivering exceptional results.
          </motion.p>
          <motion.a
            href="#projects"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            View My Projects
          </motion.a>
        </header>
``
        {/* Photo Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 inline-block shadow-lg"
          >
            <motion.img
              src="https://i.postimg.cc/8khBfGXC/Vidit.jpg"
              alt="Your Photo"
              className="w-70 h-80  mx-auto mb-4 border-4 border-blue-400 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h2 className="text-2xl font-bold">About Me</h2>
            <p className="text-gray-300 mt-4">
              Hi! I'm Vidit, a passionate developer with experience in data science, web development, and backend technologies.
            </p>
          </motion.div>
        </section>

        {/* Projects Section */}
<section id="projects" className="container mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold mb-8 text-center text-white">Projects</h2>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {[
      {
        id: 1,
        title: "Zyrax website",
        description:
          "This is a great initiative take by a startup for the women that are usually at home and dont have the facilites like Gym and park available so they can join a huge community of like minded women transform together and I made the website and the backend for them to help this narative!",
        image: "https://i.postimg.cc/cLfDsYqF/prz.png", // Replace with actual image path
        link: "www.zyrax.fit",
      },
      {
        id: 2,
        title: "Zylo website",
        description:
          "This is a great initiative take by a startup for the women that are usually at home and dont have the facilites like Gym and park available so they can join a huge community of like minded women transform together and I made the website and the backend for them to help this narative!",
        image: "https://i.postimg.cc/6QjbSKxK/przylo.png",
        link: "www.zylo.fit",
      },
      {
        id: 2,
        title: "Zylo website",
        description:
          "This is a great initiative take by a startup for the women that are usually at home and dont have the facilites like Gym and park available so they can join a huge community of like minded women transform together and I made the website and the backend for them to help this narative!",
        image: "https://i.postimg.cc/6QjbSKxK/przylo.png",
        link: "www.zylo.fit",
      },
      {
        id: 2,
        title: "Zylo website",
        description:
          "This is a great initiative take by a startup for the women that are usually at home and dont have the facilites like Gym and park available so they can join a huge community of like minded women transform together and I made the website and the backend for them to help this narative!",
        image: "https://i.postimg.cc/6QjbSKxK/przylo.png",
        link: "www.zylo.fit",
      },
      {
        id: 3,
        title: "Helpit app",
        description:
          "An App which helps people to make their daily lives easy by helping people easily book services online!",
        image: "https://i.postimg.cc/L84TMWT8/prhelp.png",
        link: "#",

      },

    ].map((project) => (
      <motion.div
        key={project.id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300">{project.description}</p>
        <a
          href={project.link}
          className="mt-4 inline-block text-blue-400 hover:underline"
        >
          View Project →
        </a>
      </motion.div>
    ))}
  </motion.div>
</section>


        <main className="container mx-auto px-4 py-12 space-y-20">
          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-blue-400" />
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Python',
                'MERN Stack',
                'Database Management',
                'Java',
                'Advanced Communication',
                'Team Collaboration',
                'Problem Solving',
                'Social Media',
                'Data Science',
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-600/50 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Brain className="text-blue-400" />
              Experience
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-xl font-semibold">Data Science, Web Dev, Languages, Backend</h3>
                <p className="text-gray-400">E-Gain, Agra</p>
                <p className="mt-2 text-gray-300">
                  I learned Python  (Pandas, NumPy, Matplotlib), Web Development (HTML, CSS, JavaScript, React), Languages (C, C++, Java) and Backend (Nodejs, SQL, MongoDB) .</p>                  
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-xl font-semibold">Development and Sales</h3>
                <p className="text-gray-400">Zylo Fitness, Agra</p>
                <p className="mt-2 text-gray-300">
                  Contributed to website development and sales initiatives, gaining valuable industry experience
                  and developing strong client relationship skills.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Database className="text-blue-400" />
              Education
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Bachelor of Technology in Computer Science</h3>
                <p className="text-gray-400">Bennett University, Greater Noida</p>
                <p className="text-blue-400">SGPA: 8.60 (First Semester)</p>
                <p className="text-gray-300">August 2024 - Present</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Languages className="text-blue-400" />
              Languages
            </h2>
            <div className="flex gap-4">
              <span className="bg-gray-700/50 px-4 py-2 rounded-lg">English</span>
              <span className="bg-gray-700/50 px-4 py-2 rounded-lg">Hindi</span>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800/50 backdrop-blur-lg py-8 mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:viditknenwaragmall.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail size={20} />
                Email
              </a>
              <a href="tel:8810107282" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone size={20} />
                +91 8810107282
              </a>
              <a href="https://github.com/MrKhenwar?tab=repositories" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Github size={20} />
                GitHub
              </a>
              <a href="www.linkedin.com/in/vidit-raj-k-443634215" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

