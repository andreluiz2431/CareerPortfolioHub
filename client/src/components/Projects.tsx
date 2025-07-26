import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Edit3, Plus, Star, Github, ExternalLink, Code } from "lucide-react";
import type { Project } from "@shared/schema";
import type { Portfolio } from "@shared/types";

export default function Projects() {
  const { isAuthenticated } = useAuth();
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: portfolio } = useQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      return response.json();
    },
  });

  const handleEdit = (project: Project) => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "project");
      editModal.setAttribute("data-edit-id", project.id.toString());
    }
  };

  const handleAdd = () => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "project");
      editModal.setAttribute("data-edit-id", "new");
    }
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-1 bg-blue-500 rounded w-24 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-700 rounded-2xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
            {isAuthenticated && (
              <Button
                onClick={handleAdd}
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-400"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest work and contributions to the open-source community
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No projects available.</p>
            {isAuthenticated && (
              <Button
                onClick={handleAdd}
                className="mt-4 bg-blue-500 hover:bg-blue-600"
              >
                Add Project
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="bg-black/50 border-white/10 overflow-hidden backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
                  {/* Project image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Code className="w-12 h-12 text-blue-500" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <div className="flex items-center space-x-2">
                        {project.stars !== null && project.stars > 0 && (
                          <span className="text-blue-500 flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4" />
                            {project.stars}
                          </span>
                        )}
                        {isAuthenticated && (
                          <Button
                            onClick={() => handleEdit(project)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-blue-500 hover:bg-cyan-500 transition-colors duration-300"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Source
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
              >
                <a 
                  href={portfolio?.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View All Projects on GitHub
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
