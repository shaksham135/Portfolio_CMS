import Navbar from '../components/portfolio/Navbar'
import Hero from '../components/portfolio/Hero'
import About from '../components/portfolio/About'
import Skills from '../components/portfolio/Skills'
import Projects from '../components/portfolio/Projects'
import Experience from '../components/portfolio/Experience'
import Services from '../components/portfolio/Services'
import Testimonials from '../components/portfolio/Testimonials'
import Contact from '../components/portfolio/Contact'
import Footer from '../components/portfolio/Footer'

export default function Portfolio() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
