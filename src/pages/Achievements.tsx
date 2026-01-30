import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import EmptyState from '@/components/ui/EmptyState';
import AchievementFormModal from '@/components/admin/AchievementFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { achievements as initialAchievements } from '@/lib/mockData';
import { Achievement } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

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

export default function Achievements() {
  const { isAdmin } = useAdmin();
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  // Admin modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingAchievement, setDeletingAchievement] = useState<Achievement | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const handleAddAchievement = () => {
    setEditingAchievement(null);
    setFormModalOpen(true);
  };

  const handleEditAchievement = (ach: Achievement) => {
    setEditingAchievement(ach);
    setFormModalOpen(true);
  };

  const handleDeleteAchievement = (ach: Achievement) => {
    setDeletingAchievement(ach);
    setDeleteModalOpen(true);
  };

  const handleSaveAchievement = (achData: Partial<Achievement>) => {
    if (editingAchievement) {
      setAchievements(prev => prev.map(a => 
        a.id === editingAchievement.id ? { ...a, ...achData } : a
      ));
    } else {
      const newAchievement: Achievement = {
        id: Date.now().toString(),
        title: achData.title || '',
        description: achData.description || '',
        date: achData.date || new Date().toISOString(),
        proofUrl: achData.proofUrl,
        createdAt: new Date().toISOString(),
      };
      setAchievements(prev => [newAchievement, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletingAchievement) {
      setAchievements(prev => prev.filter(a => a.id !== deletingAchievement.id));
      toast({ title: 'Achievement Deleted', description: `"${deletingAchievement.title}" has been removed.`, variant: 'destructive' });
      setDeleteModalOpen(false);
      setDeletingAchievement(null);
    }
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Achievements"
              subtitle="Milestones and recognitions along my journey"
            />
            <AdminButton
              onClick={handleAddAchievement}
              icon={<Plus className="w-4 h-4 mr-1" />}
            >
              Add Achievement
            </AdminButton>
          </div>

          {/* Achievements Grid */}
          {achievements.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl shadow-card border border-border p-6 relative group"
                >
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditAchievement(achievement)}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAchievement(achievement)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Trophy Badge */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                    <Trophy className="w-7 h-7 text-accent-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(achievement.date)}</span>
                    </div>
                    {achievement.proofUrl && (
                      <a
                        href={achievement.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1 text-sm"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              title="No achievements added yet"
              description="Start showcasing your accomplishments by adding your first achievement."
              icon={<Trophy className="w-10 h-10 text-muted-foreground" />}
              actionLabel="Add Achievement"
              onAction={handleAddAchievement}
            />
          )}
        </div>
      </section>

      {/* Add/Edit Achievement Modal */}
      <AchievementFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        achievement={editingAchievement}
        onSave={handleSaveAchievement}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deletingAchievement?.title || 'Achievement'}
      />
    </PageLayout>
  );
}
