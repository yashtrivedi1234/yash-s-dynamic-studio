import { motion } from 'framer-motion';
import { Download, MapPin, Calendar, Briefcase, Code, Sparkles, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillBadge from '@/components/ui/SkillBadge';
import AdminButton from '@/components/admin/AdminButton';
import { aboutData } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

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

export default function About() {
  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="About Me"
              subtitle="Get to know the person behind the code"
              align="left"
            />
            <AdminButton
              onClick={() => toast({ title: 'Edit About', description: 'Edit form would open here.' })}
              icon={<Edit className="w-4 h-4 mr-1" />}
            >
              Edit About
            </AdminButton>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-12"
          >
            {/* Photo & Quick Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Profile Card */}
                <div className="bg-card rounded-2xl shadow-card p-6 border border-border mb-6">
                  <div className="aspect-square bg-gradient-hero rounded-xl mb-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-primary-foreground">
                      <span className="font-display text-6xl font-bold">YT</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-center mb-2">
                    Yash Trivedi
                  </h3>
                  <p className="text-accent text-center font-medium mb-4">
                    Full-Stack Developer & AI Integrator
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-accent" />
                      Sitapur, Uttar Pradesh, India
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      {aboutData.highlights.yearsOfExperience}+ years experience
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-accent" />
                      {aboutData.highlights.projectsCompleted}+ projects completed
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-gradient-accent hover:opacity-90">
                    <a href={aboutData.resumeUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </div>

                {/* Tech Focus */}
                <div className="bg-card rounded-2xl shadow-card p-6 border border-border">
                  <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-accent" />
                    Tech Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.highlights.techFocus.map((tech) => (
                      <SkillBadge key={tech} name={tech} variant="accent" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio & Story */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
                <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  My Story
                </h3>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">{aboutData.bio}</p>
                  <p className="mb-4">
                    My journey in tech started with curiosity and a desire to solve real-world problems. 
                    What began as tinkering with HTML and CSS evolved into a passion for building 
                    full-stack applications that make a difference.
                  </p>
                  <p>
                    Today, I specialize in the MERN stack (MongoDB, Express, React, Node.js) and 
                    love integrating AI capabilities into applications. I believe in writing clean, 
                    maintainable code and creating user experiences that delight.
                  </p>
                </div>
              </div>

              {/* What I Do */}
              <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
                <h3 className="font-display text-2xl font-bold mb-6">What I Do</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h4 className="font-display font-semibold mb-2">Full-Stack Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Building scalable web applications from frontend to backend with modern technologies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h4 className="font-display font-semibold mb-2">AI Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Enhancing applications with AI capabilities using OpenAI, LangChain, and more.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h4 className="font-display font-semibold mb-2">API Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Creating robust, well-documented REST and GraphQL APIs for seamless integration.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h4 className="font-display font-semibold mb-2">Cloud Architecture</h4>
                    <p className="text-sm text-muted-foreground">
                      Deploying and managing applications on AWS, with focus on scalability and security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
                <h3 className="font-display text-2xl font-bold mb-6">My Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div>
                      <strong className="text-foreground">Quality Over Quantity</strong>
                      <p className="text-muted-foreground text-sm">
                        I believe in doing things right, not just fast. Clean code today saves headaches tomorrow.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div>
                      <strong className="text-foreground">Continuous Learning</strong>
                      <p className="text-muted-foreground text-sm">
                        Technology evolves rapidly. I stay curious and always eager to learn new things.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div>
                      <strong className="text-foreground">User-Centric Design</strong>
                      <p className="text-muted-foreground text-sm">
                        Great products are built for people. I focus on creating intuitive, accessible experiences.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
