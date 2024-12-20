import AboutSection from "./components/Sections/about";
import ContactSection from "./components/Sections/contact";
import Education from "./components/Sections/education";
import Experience from "./components/Sections/experience";
import HeroSection from "./components/Sections/hero-section";
import Projects from "./components/Sections/projects";
import Skills from "./components/Sections/skills";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <ContactSection />
    </>
  );
}
