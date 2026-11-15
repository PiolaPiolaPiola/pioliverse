import { Footer } from './components/layout/Footer';
import { FunFact } from './components/layout/FunFact';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Dreams } from './components/sections/Dreams';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Stack } from './components/sections/Stack';
import { Studies } from './components/sections/Studies';
import { useSmoothAnchors } from './hooks/useSmoothAnchors';
import { useVisitor } from './hooks/useVisitor';

export default function App() {
  useSmoothAnchors();
  const { visitor, total } = useVisitor();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Studies />
        <Projects />
        <Dreams />
        <Contact />
      </main>
      <Footer visitor={visitor} total={total} />
      <FunFact />
    </>
  );
}
