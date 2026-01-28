import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Code2, Palette, Database, Cloud, Zap, Users, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { projects, certificates, aboutData, socialLinks, skills, experiences, achievements, education } from '@/lib/mockData';
import SkillBadge from '@/components/ui/SkillBadge';
import AdminButton from '@/components/admin/AdminButton';
import { toast } from '@/hooks/use-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building scalable web applications with React, Node.js, and modern frameworks.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Designing efficient database schemas with MongoDB, PostgreSQL, and Redis.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Deploying and managing applications on AWS, Docker, and Kubernetes.',
  },
  {
    icon: Zap,
    title: 'AI Integration',
    description: 'Integrating AI/ML capabilities using OpenAI, LangChain, and custom models.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive, responsive interfaces with attention to user experience.',
  },
  {
    icon: Users,
    title: 'Team Leadership',
    description: 'Mentoring developers and leading projects from conception to deployment.',
  },
];

export default function Home() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const latestCertificate = certificates[0];
  const topSkills = skills.filter(s => s.proficiency >= 85).slice(0, 8);
  const latestExperience = experiences[0];
  const recentAchievements = achievements.slice(0, 3);
  const latestEducation = education[0];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-subtle" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Greeting */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Available for opportunities
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Hi, I'm{' '}
              <span className="text-gradient">Yash Trivedi</span>
              <br />
              <span className="text-foreground/80">I build products that matter</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
            >
              Full-Stack MERN Developer & AI Integrator from Sitapur, India. 
              I transform ideas into scalable, user-friendly applications with modern tech.
            </motion.p>

            {/* Tech Focus Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {aboutData.highlights.techFocus.map((tech) => (
                <SkillBadge key={tech} name={tech} variant="accent" />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gradient-accent hover:opacity-90 shadow-glow">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
              <AdminButton 
                onClick={() => toast({ title: 'Add Project', description: 'Project form would open here.' })}
                icon={<Sparkles className="w-4 h-4 mr-1" />}
              >
                Add New Project
              </AdminButton>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-12">
              <span className="text-sm text-muted-foreground">Find me on</span>
              <div className="flex gap-4">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                {aboutData.highlights.yearsOfExperience}+
              </div>
              <div className="text-primary-foreground/70">Years Experience</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                {aboutData.highlights.projectsCompleted}+
              </div>
              <div className="text-primary-foreground/70">Projects Completed</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                {certificates.length}
              </div>
              <div className="text-primary-foreground/70">Certifications</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                ∞
              </div>
              <div className="text-primary-foreground/70">Learning Spirit</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Services</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              What I Do<span className="text-accent">.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              I specialize in building end-to-end solutions, from beautiful frontends to robust backend systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/50 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Expertise</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Top Skills<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl p-4 border border-border text-center hover:border-accent/50 transition-colors"
                >
                  <div className="font-semibold mb-1">{skill.name}</div>
                  <div className="text-sm text-accent">{skill.proficiency}%</div>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-accent rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/skills">
                  View All Skills
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Featured Project</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                Latest Work<span className="text-accent">.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-card overflow-hidden border border-border"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={featuredProject.images[0]}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-accent text-sm font-medium uppercase tracking-wider mb-2">
                    {featuredProject.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    {featuredProject.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.techStack.slice(0, 4).map((tech) => (
                      <SkillBadge key={tech} name={tech} variant="outline" />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button asChild className="bg-gradient-accent hover:opacity-90">
                      <Link to="/projects">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    {featuredProject.githubUrl && (
                      <Button asChild variant="outline">
                        <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Projects Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Recent Projects<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-accent text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-md">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      {latestExperience && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent text-sm font-medium uppercase tracking-wider">Career</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Professional Journey<span className="text-accent">.</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  I've had the privilege of working with amazing teams and companies, 
                  building products that impact thousands of users.
                </p>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-xl font-semibold">{latestExperience.role}</h3>
                        {latestExperience.current && (
                          <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">Current</span>
                        )}
                      </div>
                      <p className="text-accent font-medium mb-2">{latestExperience.company}</p>
                      <p className="text-muted-foreground text-sm mb-4">{latestExperience.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {latestExperience.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-md">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link to="/experience">
                      View Full Experience
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
                  <h3 className="font-display text-2xl font-bold mb-6">Quick Stats</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{experiences.length}</div>
                        <div className="text-primary-foreground/70">Companies Worked</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{achievements.length}</div>
                        <div className="text-primary-foreground/70">Achievements</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{education.length}</div>
                        <div className="text-primary-foreground/70">Education Degrees</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Recognition</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Recent Achievements<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:border-accent/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{achievement.description}</p>
                <span className="text-xs text-accent">
                  {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/achievements">
                View All Achievements
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Certificate */}
      {latestCertificate && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Recent Achievement</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                Latest Certificate<span className="text-accent">.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-card rounded-2xl shadow-card p-6 border border-border text-center">
                <div className="aspect-[4/3] bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={latestCertificate.imageUrl}
                    alt={latestCertificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{latestCertificate.title}</h3>
                <p className="text-muted-foreground mb-4">{latestCertificate.issuer}</p>
                <Button asChild variant="outline">
                  <Link to="/certificates">
                    View All Certificates
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Education Preview */}
      {latestEducation && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Background</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                Education<span className="text-accent">.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-1">{latestEducation.degree}</h3>
                    <p className="text-accent font-medium mb-2">{latestEducation.institution}</p>
                    <p className="text-muted-foreground text-sm mb-3">{latestEducation.location}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-muted rounded-full">
                        {latestEducation.startYear} - {latestEducation.endYear || 'Present'}
                      </span>
                      {latestEducation.grade && (
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">
                          {latestEducation.grade}
                        </span>
                      )}
                    </div>
                    {latestEducation.description && (
                      <p className="text-muted-foreground mt-4">{latestEducation.description}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link to="/education">
                    View All Education
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-12 text-center text-primary-foreground"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Whether you have a project in mind or just want to connect, I'm always excited to hear new ideas and collaborate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={aboutData.resumeUrl} download>
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
