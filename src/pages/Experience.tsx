import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building, Plus, Edit, Trash2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import SkillBadge from '@/components/ui/SkillBadge';
import ExperienceFormModal from '@/components/admin/ExperienceFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { experiences as initialExperiences } from '@/lib/mockData';
import type { Experience } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Experience() {
  const { isAdmin } = useAdmin();
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  // Admin modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingExperience, setDeletingExperience] = useState<Experience | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setFormModalOpen(true);
  };

  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp);
    setFormModalOpen(true);
  };

  const handleDeleteExperience = (exp: Experience) => {
    setDeletingExperience(exp);
    setDeleteModalOpen(true);
  };

  const handleSaveExperience = (expData: Partial<Experience>) => {
    if (editingExperience) {
      setExperiences(prev => prev.map(e => 
        e.id === editingExperience.id ? { ...e, ...expData } : e
      ));
    } else {
      const newExperience: Experience = {
        id: Date.now().toString(),
        company: expData.company || '',
        role: expData.role || '',
        startDate: expData.startDate || new Date().toISOString(),
        endDate: expData.endDate,
        current: expData.current || false,
        description: expData.description || '',
        techStack: expData.techStack || [],
        createdAt: new Date().toISOString(),
      };
      setExperiences(prev => [newExperience, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletingExperience) {
      setExperiences(prev => prev.filter(e => e.id !== deletingExperience.id));
      toast({ title: 'Experience Deleted', description: `"${deletingExperience.role}" has been removed.`, variant: 'destructive' });
      setDeleteModalOpen(false);
      setDeletingExperience(null);
    }
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Work Experience"
              subtitle="My professional journey and the companies I've worked with"
            />
            <AdminButton
              onClick={handleAddExperience}
              icon={<Plus className="w-4 h-4 mr-1" />}
            >
              Add Experience
            </AdminButton>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative pl-20 pb-12 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 top-1 w-4 h-4 rounded-full border-4 border-background ${
                      exp.current ? 'bg-accent' : 'bg-muted-foreground'
                    }`}
                  />

                  {/* Experience Card */}
                  <div className="bg-card rounded-xl shadow-card p-6 border border-border relative">
                    {/* Admin Controls */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditExperience(exp)}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                        <Building className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate!)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <SkillBadge key={tech} name={tech} variant="outline" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add/Edit Experience Modal */}
      <ExperienceFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        experience={editingExperience}
        onSave={handleSaveExperience}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deletingExperience?.role || 'Experience'}
      />
    </PageLayout>
  );
}
