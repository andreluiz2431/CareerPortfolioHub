import { AuthProvider } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LoginModal from "@/components/LoginModal";
import EditModal from "@/components/EditModal";
import profileImage from "../../../data/assets/images/perfil.jpg";

export default function Portfolio() {
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      return response.json();
    },
  });

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
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-500">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-semibold">{portfolio?.name}</span>
              </div>
              <p className="text-gray-400 mb-6">{portfolio?.tagline}</p>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors">About</a>
                <a href="#experience" className="text-gray-400 hover:text-blue-500 transition-colors">Experience</a>
                <a href="#projects" className="text-gray-400 hover:text-blue-500 transition-colors">Projects</a>
                <a href="#skills" className="text-gray-400 hover:text-blue-500 transition-colors">Skills</a>
                <a href="#contact" className="text-gray-400 hover:text-blue-500 transition-colors">Contact</a>
              </div>
              <div className="text-gray-400">
                <p>&copy; 2025 Portfolio. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
