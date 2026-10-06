import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Tech from './components/Tech'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Tech />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
