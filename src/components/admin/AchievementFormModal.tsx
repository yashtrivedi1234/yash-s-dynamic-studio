import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Achievement } from '@/lib/types';

interface AchievementFormModalProps {
  open: boolean;
  onClose: () => void;
  achievement?: Achievement | null;
  onSave: (achievement: Partial<Achievement>) => void;
}

export default function AchievementFormModal({ open, onClose, achievement, onSave }: AchievementFormModalProps) {
  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    description: achievement?.description || '',
    date: achievement?.date || '',
    proofUrl: achievement?.proofUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({ title: 'Error', description: 'Title and description are required', variant: 'destructive' });
      return;
    }

    onSave(formData);
    toast({ title: achievement ? 'Achievement Updated' : 'Achievement Added', description: `"${formData.title}" has been saved.` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {achievement ? 'Edit Achievement' : 'Add New Achievement'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Achievement Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., Hackathon Winner - TechFest 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the achievement..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proofUrl">Proof URL (optional)</Label>
            <Input
              id="proofUrl"
              type="url"
              value={formData.proofUrl}
              onChange={(e) => setFormData({ ...formData, proofUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {achievement ? 'Update Achievement' : 'Add Achievement'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
