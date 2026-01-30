import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Award, 
  Briefcase, 
  Trophy, 
  GraduationCap, 
  Wrench,
  User,
  Mail,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { projects, certificates, experiences, achievements, education, skills } from '@/lib/mockData';
import { useEffect } from 'react';

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

const stats = [
  { label: 'Projects', value: projects.length, icon: FolderKanban, href: '/projects', color: 'bg-blue-500/10 text-blue-500' },
  { label: 'Certificates', value: certificates.length, icon: Award, href: '/certificates', color: 'bg-green-500/10 text-green-500' },
  { label: 'Experiences', value: experiences.length, icon: Briefcase, href: '/experience', color: 'bg-purple-500/10 text-purple-500' },
  { label: 'Achievements', value: achievements.length, icon: Trophy, href: '/achievements', color: 'bg-yellow-500/10 text-yellow-500' },
  { label: 'Education', value: education.length, icon: GraduationCap, href: '/education', color: 'bg-pink-500/10 text-pink-500' },
  { label: 'Skills', value: skills.length, icon: Wrench, href: '/skills', color: 'bg-cyan-500/10 text-cyan-500' },
];

const quickActions = [
  { label: 'Add Project', href: '/projects', icon: FolderKanban },
  { label: 'Add Certificate', href: '/certificates', icon: Award },
  { label: 'Add Experience', href: '/experience', icon: Briefcase },
  { label: 'Add Achievement', href: '/achievements', icon: Trophy },
  { label: 'Add Education', href: '/education', icon: GraduationCap },
  { label: 'Add Skill', href: '/skills', icon: Wrench },
];

export default function Admin() {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-accent" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your portfolio content from one place
              </p>
            </div>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stats Grid */}
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-xl font-semibold mb-4">Content Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat) => (
                  <Card 
                    key={stat.label} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(stat.href)}
                  >
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => navigate(action.href)}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Management Sections */}
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-xl font-semibold mb-4">Manage Sections</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Projects */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                          <FolderKanban className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Projects</CardTitle>
                          <CardDescription>{projects.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="text-sm text-muted-foreground truncate">
                          • {project.title}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/projects')}>
                      Manage Projects
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Certificates */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Certificates</CardTitle>
                          <CardDescription>{certificates.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {certificates.slice(0, 3).map((cert) => (
                        <div key={cert.id} className="text-sm text-muted-foreground truncate">
                          • {cert.title}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/certificates')}>
                      Manage Certificates
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Experience</CardTitle>
                          <CardDescription>{experiences.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {experiences.slice(0, 3).map((exp) => (
                        <div key={exp.id} className="text-sm text-muted-foreground truncate">
                          • {exp.role} at {exp.company}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/experience')}>
                      Manage Experience
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Achievements</CardTitle>
                          <CardDescription>{achievements.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {achievements.slice(0, 3).map((ach) => (
                        <div key={ach.id} className="text-sm text-muted-foreground truncate">
                          • {ach.title}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/achievements')}>
                      Manage Achievements
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Education</CardTitle>
                          <CardDescription>{education.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {education.slice(0, 3).map((edu) => (
                        <div key={edu.id} className="text-sm text-muted-foreground truncate">
                          • {edu.degree}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/education')}>
                      Manage Education
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Skills</CardTitle>
                          <CardDescription>{skills.length} items</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {skills.slice(0, 3).map((skill) => (
                        <div key={skill.id} className="text-sm text-muted-foreground truncate">
                          • {skill.name}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/skills')}>
                      Manage Skills
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Other Settings */}
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-xl font-semibold mb-4">Other Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">About Section</CardTitle>
                        <CardDescription>Update bio and highlights</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/about')}>
                      Edit About
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Contact & Social</CardTitle>
                        <CardDescription>Manage contact info and links</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/contact')}>
                      Edit Contact
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

