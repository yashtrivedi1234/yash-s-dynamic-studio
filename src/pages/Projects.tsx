import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import SkillBadge from '@/components/ui/SkillBadge';
import EmptyState from '@/components/ui/EmptyState';
import { projects } from '@/lib/mockData';
import { Project } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'personal', label: 'Personal' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Projects"
              subtitle="A showcase of my work and the problems I've solved"
            />
            <AdminButton
              onClick={() => toast({ title: 'Add Project', description: 'Project form would open here.' })}
              icon={<Plus className="w-4 h-4 mr-1" />}
            >
              Add Project
            </AdminButton>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Filter className="w-5 h-5 text-muted-foreground mt-2" />
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'bg-gradient-accent hover:opacity-90' : ''}
              >
                {cat.label}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card rounded-xl shadow-card border border-border overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">View Details</span>
                      </div>
                      {project.featured && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-accent text-sm font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl font-bold mt-1 mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <SkillBadge key={tech} name={tech} variant="outline" className="text-xs" />
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState
              title="No projects found"
              description="No projects match the selected category. Try selecting a different filter."
              actionLabel="Add First Project"
              onAction={() => toast({ title: 'Add Project' })}
            />
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Image */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <SkillBadge key={tech} name={tech} variant="accent" />
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.githubUrl && (
                    <Button asChild variant="outline">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button asChild className="bg-gradient-accent hover:opacity-90">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
