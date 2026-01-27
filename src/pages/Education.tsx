import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Plus, Edit } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import { education } from '@/lib/mockData';
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

export default function Education() {
  const { isAdmin } = useAdmin();

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
              onClick={() => toast({ title: 'Add Education', description: 'Education form would open here.' })}
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

              {education.map((edu, index) => (
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
                      <button
                        onClick={() => toast({ title: 'Edit Education' })}
                        className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
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
    </PageLayout>
  );
}
