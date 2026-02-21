import './index.css';
import './styles/animations.css';
import CustomCursor from './components/CustomCursor';
import WebGLBackground from './components/WebGLBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <WebGLBackground />
      <ScrollProgress />
      <Navbar />
      <BackToTop />
      <ThemeSwitcher />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
