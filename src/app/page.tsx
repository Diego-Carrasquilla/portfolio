import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import PageBackground from "@/components/PageBackground";

export default function Home() {
  return (
    <main className="relative">
      <PageBackground />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Contact />
    </main>
  );
}

