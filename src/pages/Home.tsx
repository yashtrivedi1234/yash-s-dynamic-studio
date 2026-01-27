import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { projects, certificates, aboutData, socialLinks } from '@/lib/mockData';
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

export default function Home() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const latestCertificate = certificates[0];

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

      {/* Latest Certificate */}
      {latestCertificate && (
        <section className="py-20 bg-muted/50">
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
