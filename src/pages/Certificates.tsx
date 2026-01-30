import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, ExternalLink, Upload, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import AdminButton from '@/components/admin/AdminButton';
import EmptyState from '@/components/ui/EmptyState';
import CertificateFormModal from '@/components/admin/CertificateFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { certificates as initialCertificates } from '@/lib/mockData';
import { Certificate } from '@/lib/types';
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Certificates() {
  const { isAdmin } = useAdmin();
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Admin modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCertificate, setDeletingCertificate] = useState<Certificate | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const handleAddCertificate = () => {
    setEditingCertificate(null);
    setFormModalOpen(true);
  };

  const handleEditCertificate = (cert: Certificate, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCertificate(cert);
    setFormModalOpen(true);
  };

  const handleDeleteCertificate = (cert: Certificate, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingCertificate(cert);
    setDeleteModalOpen(true);
  };

  const handleSaveCertificate = (certData: Partial<Certificate>) => {
    if (editingCertificate) {
      setCertificates(prev => prev.map(c => 
        c.id === editingCertificate.id ? { ...c, ...certData } : c
      ));
    } else {
      const newCertificate: Certificate = {
        id: Date.now().toString(),
        title: certData.title || '',
        issuer: certData.issuer || '',
        issueDate: certData.issueDate || new Date().toISOString(),
        imageUrl: certData.imageUrl || '',
        credentialUrl: certData.credentialUrl,
        createdAt: new Date().toISOString(),
      };
      setCertificates(prev => [newCertificate, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletingCertificate) {
      setCertificates(prev => prev.filter(c => c.id !== deletingCertificate.id));
      toast({ title: 'Certificate Deleted', description: `"${deletingCertificate.title}" has been removed.`, variant: 'destructive' });
      setDeleteModalOpen(false);
      setDeletingCertificate(null);
    }
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader
              title="Certificates"
              subtitle="Professional certifications and achievements"
            />
            <AdminButton
              onClick={handleAddCertificate}
              icon={<Upload className="w-4 h-4 mr-1" />}
            >
              Upload Certificate
            </AdminButton>
          </div>

          {/* Certificates Grid */}
          {certificates.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl shadow-card border border-border overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEditCertificate(cert, e)}
                        className="p-2 rounded-md bg-background/80 backdrop-blur hover:bg-background text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteCertificate(cert, e)}
                        className="p-2 rounded-md bg-background/80 backdrop-blur hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Certificate Image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-primary-foreground text-sm font-medium">
                        Click to view
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">{cert.issuer}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2">{cert.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Issued {formatDate(cert.issueDate)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              title="No certificates added yet"
              description="Start showcasing your certifications by uploading your first certificate."
              icon={<Award className="w-10 h-10 text-muted-foreground" />}
              actionLabel="Upload Certificate"
              onAction={handleAddCertificate}
            />
          )}
        </div>
      </section>

      {/* Certificate Preview Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {selectedCertificate.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedCertificate.imageUrl}
                    alt={selectedCertificate.title}
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-muted-foreground">
                      Issued by <span className="text-foreground font-medium">{selectedCertificate.issuer}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedCertificate.issueDate)}
                    </p>
                  </div>
                  {selectedCertificate.credentialUrl && (
                    <Button asChild className="bg-gradient-accent hover:opacity-90">
                      <a
                        href={selectedCertificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Verify Credential
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Certificate Modal */}
      <CertificateFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        certificate={editingCertificate}
        onSave={handleSaveCertificate}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deletingCertificate?.title || 'Certificate'}
      />
    </PageLayout>
  );
}
