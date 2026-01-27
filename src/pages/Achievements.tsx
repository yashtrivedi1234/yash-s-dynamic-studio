import { motion } from 'framer-motion';
import { Trophy, Calendar, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import EmptyState from '@/components/ui/EmptyState';
import { achievements } from '@/lib/mockData';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
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
              onClick={() => toast({ title: 'Add Achievement', description: 'Achievement form would open here.' })}
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
              {achievements.map((achievement, index) => (
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
                        onClick={() => toast({ title: 'Edit Achievement' })}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast({ title: 'Delete Achievement', variant: 'destructive' })}
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
              onAction={() => toast({ title: 'Add Achievement' })}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
}
