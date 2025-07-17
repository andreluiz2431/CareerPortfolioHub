import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Edit3, Plus } from "lucide-react";
import type { Skill } from "@shared/schema";

export default function Skills() {
  const { isAuthenticated } = useAuth();
  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const handleEdit = (skill: Skill) => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "skill");
      editModal.setAttribute("data-edit-id", skill.id.toString());
    }
  };

  const handleAdd = () => {
    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.classList.remove("hidden");
      editModal.setAttribute("data-edit-type", "skill");
      editModal.setAttribute("data-edit-id", "new");
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'fab fa-js-square';
      case 'backend':
        return 'fas fa-server';
      case 'database':
        return 'fas fa-database';
      case 'cloud':
      case 'devops':
        return 'fas fa-cloud';
      default:
        return 'fas fa-code';
    }
  };

  if (isLoading) {
    return (
      <section id="skills" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded mb-4 w-64 mx-auto"></div>
              <div className="h-1 bg-blue-500 rounded w-24 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
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
    <section id="skills" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
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
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        {Object.keys(skillsByCategory).length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No skills data available.</p>
            {isAuthenticated && (
              <Button
                onClick={handleAdd}
                className="mt-4 bg-blue-500 hover:bg-blue-600"
              >
                Add Skill
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card key={category} className="bg-gray-900/50 border-white/10 backdrop-blur-space hover:border-blue-500/30 transition-all duration-300 card-hover">
                <CardContent className="p-6">
                  <div className="text-blue-500 text-4xl mb-4">
                    <i className={getCategoryIcon(category)}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 capitalize">{category}</h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-sm">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-500 text-sm">{skill.level}%</span>
                            {isAuthenticated && (
                              <Button
                                onClick={() => handleEdit(skill)}
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:text-blue-400 p-1 h-auto"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 skill-bar">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
