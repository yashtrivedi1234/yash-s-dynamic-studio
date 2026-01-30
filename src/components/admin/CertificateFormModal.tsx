import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Certificate } from '@/lib/types';

interface CertificateFormModalProps {
  open: boolean;
  onClose: () => void;
  certificate?: Certificate | null;
  onSave: (certificate: Partial<Certificate>) => void;
}

export default function CertificateFormModal({ open, onClose, certificate, onSave }: CertificateFormModalProps) {
  const [formData, setFormData] = useState({
    title: certificate?.title || '',
    issuer: certificate?.issuer || '',
    issueDate: certificate?.issueDate || '',
    credentialUrl: certificate?.credentialUrl || '',
    imageUrl: certificate?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.issuer.trim()) {
      toast({ title: 'Error', description: 'Title and issuer are required', variant: 'destructive' });
      return;
    }

    onSave(formData);
    toast({ title: certificate ? 'Certificate Updated' : 'Certificate Added', description: `"${formData.title}" has been saved.` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {certificate ? 'Edit Certificate' : 'Add New Certificate'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Certificate Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., AWS Solutions Architect"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization *</Label>
            <Input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="E.g., Amazon Web Services"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialUrl">Credential URL</Label>
            <Input
              id="credentialUrl"
              type="url"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://verify.certificate.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Certificate Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="URL to certificate image"
            />
            <p className="text-xs text-muted-foreground">
              Upload image to cloud storage and paste URL here
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {certificate ? 'Update Certificate' : 'Add Certificate'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
