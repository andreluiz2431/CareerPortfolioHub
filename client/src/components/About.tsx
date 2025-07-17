import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import type { PortfolioData } from "@shared/schema";

export default function About() {
  const { isAuthenticated } = useAuth();
  const { data: portfolio, isLoading } = useQuery<PortfolioData>({
    queryKey: ["/api/portfolio"],
  });

  const handleEdit = () => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      // Set edit type for modal
      editModal.setAttribute("data-edit-type", "portfolio");
      editModal.setAttribute("data-edit-id", "1");
    }
  };

  if (isLoading) {
    return (
      <section id="about" className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-1 bg-blue-500 rounded mb-16 w-24 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
            {isAuthenticated && (
              <Button
                onClick={handleEdit}
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-400"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Card className="bg-black/50 border-white/10 backdrop-blur-space card-hover">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Professional Journey</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {portfolio?.bio || "With years of experience in full-stack development, I specialize in creating scalable web applications using modern technologies. My passion lies in solving complex problems and delivering exceptional user experiences through clean, efficient code."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20">React</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20">Node.js</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20">TypeScript</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm border border-blue-500/20">Python</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-black/50 border-white/10 text-center backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {portfolio?.projectsCount || "50+"}
                </div>
                <div className="text-gray-400">Projects Completed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-white/10 text-center backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {portfolio?.experienceYears || "5+"}
                </div>
                <div className="text-gray-400">Years Experience</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-white/10 text-center backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {portfolio?.clientsCount || "30+"}
                </div>
                <div className="text-gray-400">Happy Clients</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-white/10 text-center backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {portfolio?.technologiesCount || "25+"}
                </div>
                <div className="text-gray-400">Technologies</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
