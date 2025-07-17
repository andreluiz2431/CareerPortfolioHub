import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, Trash2 } from "lucide-react";
import type { PortfolioData, Project, Experience, Skill } from "@shared/schema";

export default function EditModal() {
  const [editType, setEditType] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data based on edit type and id
  const { data: portfolioData } = useQuery<PortfolioData>({
    queryKey: ["/api/portfolio"],
    enabled: editType === "portfolio",
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: editType === "project",
  });

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
    enabled: editType === "experience",
  });

  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
    enabled: editType === "skill",
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ type, id, data }: { type: string; id: string; data: any }) => {
      if (type === "portfolio") {
        const response = await apiRequest("PUT", "/api/portfolio", data);
        return response.json();
      } else if (id === "new") {
        const response = await apiRequest("POST", `/api/${type}s`, data);
        return response.json();
      } else {
        const response = await apiRequest("PUT", `/api/${type}s/${id}`, data);
        return response.json();
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Data updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/${editType}s`] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      closeModal();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update data",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      const response = await apiRequest("DELETE", `/api/${type}s/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Item deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/${editType}s`] });
      closeModal();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const modal = document.getElementById("editModal");
    if (modal) {
      const observer = new MutationObserver(() => {
        const type = modal.getAttribute("data-edit-type") || "";
        const id = modal.getAttribute("data-edit-id") || "";
        
        if (type && id) {
          setEditType(type);
          setEditId(id);
          
          // Initialize form data based on type and id
          if (type === "portfolio" && portfolioData) {
            setFormData(portfolioData);
          } else if (type === "project") {
            if (id === "new") {
              setFormData({
                name: "",
                description: "",
                githubUrl: "",
                liveUrl: "",
                technologies: "",
                featured: false,
              });
            } else {
              const project = projects.find(p => p.id.toString() === id);
              if (project) {
                setFormData({
                  ...project,
                  technologies: project.technologies?.join(", ") || "",
                });
              }
            }
          } else if (type === "experience") {
            if (id === "new") {
              setFormData({
                title: "",
                company: "",
                period: "",
                description: "",
                technologies: "",
                order: 0,
              });
            } else {
              const experience = experiences.find(e => e.id.toString() === id);
              if (experience) {
                setFormData({
                  ...experience,
                  technologies: experience.technologies?.join(", ") || "",
                });
              }
            }
          } else if (type === "skill") {
            if (id === "new") {
              setFormData({
                category: "",
                name: "",
                level: 0,
                icon: "",
              });
            } else {
              const skill = skills.find(s => s.id.toString() === id);
              if (skill) {
                setFormData(skill);
              }
            }
          }
        }
      });

      observer.observe(modal, { attributes: true });
      return () => observer.disconnect();
    }
  }, [portfolioData, projects, experiences, skills]);

  const closeModal = () => {
    const modal = document.getElementById("editModal");
    if (modal) {
      modal.classList.add("hidden");
    }
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedData = { ...formData };
    
    // Process technologies array
    if (processedData.technologies && typeof processedData.technologies === "string") {
      processedData.technologies = processedData.technologies.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
    
    // Convert numeric fields
    if (processedData.level) {
      processedData.level = parseInt(processedData.level);
    }
    if (processedData.order) {
      processedData.order = parseInt(processedData.order);
    }

    updateMutation.mutate({
      type: editType,
      id: editId,
      data: processedData,
    });
  };

  const handleDelete = () => {
    if (editId !== "new" && window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate({
        type: editType,
        id: editId,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderFormFields = () => {
    switch (editType) {
      case "portfolio":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description || ""}
                onChange={handleInputChange}
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio || ""}
                onChange={handleInputChange}
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
          </>
        );

      case "project":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description || ""}
                onChange={handleInputChange}
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL (optional)</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stars">Stars</Label>
                <Input
                  id="stars"
                  name="stars"
                  type="number"
                  value={formData.stars || 0}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies || ""}
                onChange={handleInputChange}
                placeholder="React, Node.js, TypeScript"
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
          </>
        );

      case "experience":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  name="period"
                  value={formData.period || ""}
                  onChange={handleInputChange}
                  placeholder="2020 - 2022"
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order || 0}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description || ""}
                onChange={handleInputChange}
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies || ""}
                onChange={handleInputChange}
                placeholder="React, Node.js, TypeScript"
                className="bg-black border-white/20 focus:border-blue-500"
              />
            </div>
          </>
        );

      case "skill":
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category || ""} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="bg-black border-white/20 focus:border-blue-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level (0-100)</Label>
                <Input
                  id="level"
                  name="level"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.level || 0}
                  onChange={handleInputChange}
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (FontAwesome class)</Label>
                <Input
                  id="icon"
                  name="icon"
                  value={formData.icon || ""}
                  onChange={handleInputChange}
                  placeholder="fab fa-react"
                  className="bg-black border-white/20 focus:border-blue-500"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      id="editModal" 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">
            {editId === "new" ? `Add ${editType}` : `Edit ${editType}`}
          </h3>
          <div className="flex items-center gap-2">
            {editId !== "new" && (
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-400"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderFormFields()}
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-blue-500 hover:bg-cyan-500 transition-all duration-300"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="border-white/20 text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
