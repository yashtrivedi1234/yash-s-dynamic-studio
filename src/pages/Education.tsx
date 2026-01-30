import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import EducationFormModal from '@/components/admin/EducationFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { education as initialEducation } from '@/lib/mockData';
import { Education } from '@/lib/types';
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

export default function EducationPage() {
  const { isAdmin } = useAdmin();
  const [education, setEducation] = useState<Education[]>(initialEducation);

  // Admin modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingEducation, setDeletingEducation] = useState<Education | null>(null);

  const handleAddEducation = () => {
    setEditingEducation(null);
    setFormModalOpen(true);
  };

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    setFormModalOpen(true);
  };

  const handleDeleteEducation = (edu: Education) => {
    setDeletingEducation(edu);
    setDeleteModalOpen(true);
  };

  const handleSaveEducation = (eduData: Partial<Education>) => {
    if (editingEducation) {
      setEducation(prev => prev.map(e => 
        e.id === editingEducation.id ? { ...e, ...eduData } : e
      ));
    } else {
      const newEducation: Education = {
        id: Date.now().toString(),
        degree: eduData.degree || '',
        institution: eduData.institution || '',
        location: eduData.location || '',
        startYear: eduData.startYear || '',
        endYear: eduData.endYear,
        current: eduData.current || false,
        description: eduData.description,
        grade: eduData.grade,
      };
      setEducation(prev => [newEducation, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletingEducation) {
      setEducation(prev => prev.filter(e => e.id !== deletingEducation.id));
      toast({ title: 'Education Deleted', description: `"${deletingEducation.degree}" has been removed.`, variant: 'destructive' });
      setDeleteModalOpen(false);
      setDeletingEducation(null);
    }
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Education"
              subtitle="My academic background and qualifications"
            />
            <AdminButton
              onClick={handleAddEducation}
              icon={<Plus className="w-4 h-4 mr-1" />}
            >
              Add Education
            </AdminButton>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="relative pl-20 pb-12 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 top-1 w-4 h-4 rounded-full border-4 border-background ${
                      edu.current ? 'bg-accent' : 'bg-muted-foreground'
                    }`}
                  />

                  {/* Education Card */}
                  <div className="bg-card rounded-xl shadow-card p-6 border border-border relative">
                    {/* Admin Controls */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditEducation(edu)}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(edu)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold">{edu.degree}</h3>
                        <p className="text-accent font-medium">{edu.institution}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {edu.startYear} — {edu.current ? 'Present' : edu.endYear}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {edu.description && (
                      <p className="text-muted-foreground mb-4">{edu.description}</p>
                    )}

                    {/* Grade */}
                    {edu.grade && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                        {edu.grade}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add/Edit Education Modal */}
      <EducationFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        education={editingEducation}
        onSave={handleSaveEducation}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deletingEducation?.degree || 'Education'}
      />
    </PageLayout>
  );
}
