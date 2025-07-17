import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Edit3, Plus } from "lucide-react";
import type { Experience } from "@shared/schema";

export default function Experience() {
  const { isAuthenticated } = useAuth();
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const handleEdit = (experience: Experience) => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "experience");
      editModal.setAttribute("data-edit-id", experience.id.toString());
    }
  };

  const handleAdd = () => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "experience");
      editModal.setAttribute("data-edit-id", "new");
    }
  };

  if (isLoading) {
    return (
      <section id="experience" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-1 bg-blue-500 rounded w-24 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
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
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No experience data available.</p>
              {isAuthenticated && (
                <Button
                  onClick={handleAdd}
                  className="mt-4 bg-blue-500 hover:bg-blue-600"
                >
                  Add Experience
                </Button>
              )}
            </div>
          ) : (
            experiences.map((experience, index) => (
              <div key={experience.id} className="relative pl-8 pb-12 timeline-line">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                
                <Card className="bg-gray-900/50 border-white/10 backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{experience.title}</h3>
                        <div className="text-blue-500 font-medium">{experience.company}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-gray-400 font-mono">{experience.period}</div>
                        {isAuthenticated && (
                          <Button
                            onClick={() => handleEdit(experience)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {experience.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies?.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
