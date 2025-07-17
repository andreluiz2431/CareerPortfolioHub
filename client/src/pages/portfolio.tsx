import { AuthProvider } from "@/hooks/use-auth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LoginModal from "@/components/LoginModal";
import EditModal from "@/components/EditModal";

export default function Portfolio() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <LoginModal />
        <EditModal />
        
        {/* Footer */}
        <footer className="bg-black py-12 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-code text-white text-sm"></i>
                </div>
                <span className="text-xl font-semibold">Portfolio</span>
              </div>
              <p className="text-gray-400 mb-6">Building the future, one line of code at a time</p>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors">About</a>
                <a href="#experience" className="text-gray-400 hover:text-blue-500 transition-colors">Experience</a>
                <a href="#projects" className="text-gray-400 hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="text-gray-400 hover:text-blue-500 transition-colors">Skills</a>
                <a href="#contact" className="text-gray-400 hover:text-blue-500 transition-colors">Contact</a>
              </div>
              <div className="text-gray-400">
                <p>&copy; 2024 Portfolio. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
