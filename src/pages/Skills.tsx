import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import SkillFormModal from '@/components/admin/SkillFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { skills as initialSkills } from '@/lib/mockData';
import { Skill } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

const categories = [
  { id: 'frontend', label: 'Frontend', color: 'bg-blue-500' },
  { id: 'backend', label: 'Backend', color: 'bg-green-500' },
  { id: 'database', label: 'Database', color: 'bg-yellow-500' },
  { id: 'devops', label: 'DevOps', color: 'bg-orange-500' },
  { id: 'ai', label: 'AI/ML', color: 'bg-purple-500' },
  { id: 'tools', label: 'Tools', color: 'bg-pink-500' },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  // Admin modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory && skill.visible)
    : skills.filter((skill) => skill.visible);

  const handleAddSkill = () => {
    setEditingSkill(null);
    setFormModalOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setFormModalOpen(true);
  };

  const handleSaveSkill = (skillData: Partial<Skill>) => {
    if (editingSkill) {
      setSkills(prev => prev.map(s => 
        s.id === editingSkill.id ? { ...s, ...skillData } : s
      ));
    } else {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: skillData.name || '',
        category: skillData.category || 'frontend',
        proficiency: skillData.proficiency || 80,
        visible: skillData.visible ?? true,
      };
      setSkills(prev => [newSkill, ...prev]);
    }
  };

  const toggleVisibility = (skillId: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId ? { ...skill, visible: !skill.visible } : skill
      )
    );
    toast({
      title: 'Skill visibility updated',
      description: 'The skill visibility has been toggled.',
    });
  };

  const handleDeleteSkill = (skill: Skill) => {
    setDeletingSkill(skill);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingSkill) {
      setSkills(prev => prev.filter(s => s.id !== deletingSkill.id));
      toast({ title: 'Skill Deleted', description: `"${deletingSkill.name}" has been removed.`, variant: 'destructive' });
      setDeleteModalOpen(false);
      setDeletingSkill(null);
    }
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Skills & Technologies"
              subtitle="The tools and technologies I work with"
            />
            <AdminButton
              onClick={handleAddSkill}
              icon={<Plus className="w-4 h-4 mr-1" />}
            >
              Add Skill
            </AdminButton>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-gradient-accent hover:opacity-90' : ''}
            >
              All
            </Button>
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

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill) => {
              const category = categories.find((c) => c.id === skill.category);
              return (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  layout
                  className="bg-card rounded-xl shadow-card p-6 border border-border group relative"
                >
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleVisibility(skill.id)}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        {skill.visible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${category?.color || 'bg-gray-500'}`} />
                    <h3 className="font-display font-semibold text-lg">{skill.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{category?.label}</span>
                      <span className="text-accent font-medium">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* All Skills by Category */}
          <div className="mt-20">
            <h3 className="font-display text-2xl font-bold text-center mb-12">
              Skills by Category<span className="text-accent">.</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => {
                const categorySkills = skills.filter(
                  (s) => s.category === cat.id && s.visible
                );
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl shadow-card p-6 border border-border"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${cat.color}`} />
                      <h4 className="font-display font-semibold">{cat.label}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Add/Edit Skill Modal */}
      <SkillFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        skill={editingSkill}
        onSave={handleSaveSkill}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deletingSkill?.name || 'Skill'}
      />
    </PageLayout>
  );
}
